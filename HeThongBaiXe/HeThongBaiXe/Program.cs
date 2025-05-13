using HeThongBaiXe.Services;
using HeThongBaiXe;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QLKS.Data;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT + Session
builder.Services.AddHttpContextAccessor();
var jwtSettings = builder.Configuration.GetSection("Jwt");
var secretKeyValue = jwtSettings["Key"];

var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKeyValue));
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = secretKey
        };

        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = async context =>
            {
                var authHeader = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                if (authHeader == null || !authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    context.Fail("Token không hợp lệ.");
                    return;
                }
            }
        };

    });

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", opt =>
    {
        opt.WithOrigins("https://localhost:3000", "http://localhost:3000") // đúng là https (nếu không dùng https thì sửa lại thành http)
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token in the format: Bearer {your token here}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Admin"));
    options.AddPolicy("KhachHangPolicy", policy => policy.RequireRole("KhachHang"));
});

// Đăng ký DI Services
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IChoDeXeService, ChoDeXeService>();
builder.Services.AddScoped<IBangPhiGuiXeService, BangPhiGuiXeService>();
builder.Services.AddScoped<ITaiKhoanService, TaiKhoanService>();
builder.Services.AddScoped<IChiTietGuiXeService, ChiTietGuiXeService>();
builder.Services.AddScoped<IPhuongTienService, PhuongTienService>();
builder.Services.AddScoped<JwtService>();

var app = builder.Build();

// Middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseSession();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();

// Swagger mặc định ở route gốc "/"
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "HeThongBaiXe API V1");
    c.RoutePrefix = string.Empty; // 👈 rất quan trọng
});

app.MapControllers();
app.Run();
