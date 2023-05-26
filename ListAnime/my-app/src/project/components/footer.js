import React from "react";

export default function Footer() {
  return (
    <div className="footer-fix">
      <div className="footer-header"></div>
      <div className="footer-body">
        <div className="footer-two">
          <div className="main-width clearfix">
            <div className="spec-footer first">
              <h4 className="fix-title-footer">Giới thiệu</h4>
              <p className="content-footer">
                <a>MyListAnime, </a>
                Trang quản lý danh sách Anime yêu thích chất lượng cao, tất cả
                các bộ anime trên được tổng hợp từ Internet
                <br />
                <br />
                Xem tốt nhất với màn hình độ phân giải 1600x900px trở lên và sử
                dụng trình duyệt Mozilla Firefox, Chrome & Cốc Cốc.
              </p>
            </div>
            <div className="spec-footer last">
              <h4 className="fix-title-footer">Liên hệ</h4>
              <ul
                className="content-footer"
                style={{
                  listStyle: "none",
                  paddingLeft: "0px",
                  marginBottom: "0px",
                  wordWrap: "break-word",
                }}
              >
                <li>
                  <a
                    className="fix-title-footer"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "14px",
                    }}
                    href="https://www.facebook.com/profile.php?id=100046711640710"
                  >
                    Facebook.com/BuiVanTanTai
                  </a>
                </li>
                <li>
                  <a>Email liên hệ: buivantantai112@gmail.com</a>
                </li>
              </ul>
              <div className="footer-link ">
                <h3 className="footer-link-head fix-title-footer">
                  Liên Kết Anime Hay
                </h3>
                <div className="footer-link-bottom content-footer">
                  <a>Anime Top | </a>
                  <a>Anime HD | </a>
                  <a>Anime Action | </a>
                  <a>Anime Adventure | </a>
                  <a>Anime Fantasy | </a>
                  <a>Anime Parody</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-container container">
          <div>
            <p>@2023 MyListAnime Made by Bùi Văn Tấn Tài</p>
          </div>
        </div>
      </div>
    </div>
  );
}
