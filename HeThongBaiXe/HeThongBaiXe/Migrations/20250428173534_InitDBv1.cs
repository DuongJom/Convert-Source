using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HeThongBaiXe.Migrations
{
    public partial class InitDBv1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BangPhiGuiXes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LoaiXe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GiaGui = table.Column<double>(type: "float", nullable: false),
                    LoaiGui = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BangPhiGuiXes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChoDeXes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ViTri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChoDeXes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaiKhoans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDangNhap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatKhau = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GioiTinh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaiKhoans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhuongTiens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BienSo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LoaiXe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HoTenChuXe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sdt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CCCD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaCaVet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaiKhoanId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhuongTiens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhuongTiens_TaiKhoans_TaiKhoanId",
                        column: x => x.TaiKhoanId,
                        principalTable: "TaiKhoans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietGuiXes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChoDeXeId = table.Column<int>(type: "int", nullable: false),
                    PhuongTienId = table.Column<int>(type: "int", nullable: false),
                    NgayGui = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayRa = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietGuiXes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChiTietGuiXes_ChoDeXes_ChoDeXeId",
                        column: x => x.ChoDeXeId,
                        principalTable: "ChoDeXes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietGuiXes_PhuongTiens_PhuongTienId",
                        column: x => x.PhuongTienId,
                        principalTable: "PhuongTiens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HoaDons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChiTietGuiXeId = table.Column<int>(type: "int", nullable: false),
                    BangPhiGuiXeId = table.Column<int>(type: "int", nullable: false),
                    TongHoaDon = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HoaDons_BangPhiGuiXes_BangPhiGuiXeId",
                        column: x => x.BangPhiGuiXeId,
                        principalTable: "BangPhiGuiXes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HoaDons_ChiTietGuiXes_ChiTietGuiXeId",
                        column: x => x.ChiTietGuiXeId,
                        principalTable: "ChiTietGuiXes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGuiXes_ChoDeXeId",
                table: "ChiTietGuiXes",
                column: "ChoDeXeId");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGuiXes_PhuongTienId",
                table: "ChiTietGuiXes",
                column: "PhuongTienId");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDons_BangPhiGuiXeId",
                table: "HoaDons",
                column: "BangPhiGuiXeId");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDons_ChiTietGuiXeId",
                table: "HoaDons",
                column: "ChiTietGuiXeId");

            migrationBuilder.CreateIndex(
                name: "IX_PhuongTiens_TaiKhoanId",
                table: "PhuongTiens",
                column: "TaiKhoanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoaDons");

            migrationBuilder.DropTable(
                name: "BangPhiGuiXes");

            migrationBuilder.DropTable(
                name: "ChiTietGuiXes");

            migrationBuilder.DropTable(
                name: "ChoDeXes");

            migrationBuilder.DropTable(
                name: "PhuongTiens");

            migrationBuilder.DropTable(
                name: "TaiKhoans");
        }
    }
}
