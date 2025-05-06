import "./style.scss";
import logo from "../../../assets/images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useRef, useState } from "react";
import { getBlogDetail } from "../../../redux/actions/blogActions";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import ScrollToTop from "../../../layout/ScrollLayout";

const BlogDetailComponent = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const stateBlogDetail = useAppSelector((state) => state.blog);
  console.log("stateBlogDetail", stateBlogDetail);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [processedContent, setProcessedContent] = useState<string | null>(null);

  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const generateContentWithIds = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const headings = Array.from(doc.querySelectorAll("h2, h3"));
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id =
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      }
    });

    return doc.body.innerHTML;
  };
  // Gọi API khi có id
  useEffect(() => {
    if (id) {
      const blogId = parseInt(id);
      if (!isNaN(blogId)) {
        dispatch(getBlogDetail(blogId));
      }
    }
  }, [id, dispatch]);

  // Tạo mục lục khi có content
  useEffect(() => {
    const content = stateBlogDetail.blogData?.content;
    if (!content || typeof content !== "string") return;

    const updatedContent = generateContentWithIds(content);
    setProcessedContent(updatedContent);

    // Tạo TOC
    const parser = new DOMParser();
    const doc = parser.parseFromString(updatedContent, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3"));
    const newToc = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
    }));

    setToc(newToc);
  }, [stateBlogDetail.blogData]);

  // Theo dõi scroll để cập nhật activeId
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const headings = contentRef.current.querySelectorAll("h2, h3");
      let currentId = "";
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 150) {
          currentId = heading.id;
        }
      });
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  const blogData = stateBlogDetail.blogData;

  return (
    <>
      <ScrollToTop />

      <div className="from-heading">
        {blogData ? (
          <div className="from-header-top-blog">
            <div className="from">
              <div className="heading">
                <p className="title-header">{blogData.title}</p>
                <div className="from-img">
                  {blogData.img && (
                    <img
                      src={blogData.img as string}
                      alt="DTU"
                      className="item-img"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="from-main">
              <nav className="table-of-contents">
                <h2 className="toc-title">Mục lục</h2>
                <ul className="toc-list">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={`toc-item ${activeId === item.id ? "active" : ""}`}
                    >
                      <a onClick={() => handleClick(item.id)}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="blog-content" ref={contentRef}>
                <p className="txt-content">
                  {processedContent ? (
                    parse(processedContent)
                  ) : (
                    <p>Không có nội dung</p>
                  )}
                </p>
              </div>
              <div className="from-right"></div>
            </div>
          </div>
        ) : (
          <p>Không có nội dung</p>
        )}
        <div className="section-footer">
          <div className="layout-container footer-box">
            <div className="footer-left">
              <div className="logo-white">
                <img src={logo} alt="" />
                <span>Toptimviec.com</span>
              </div>
              <p className="describe">
                Chúng tôi cung cấp thông tin về các việc làm <br /> giúp bạn
                thuận tiện hơn trong việc tìm kiếm <br />
                công việc,chúng tôi thường xuyên cung cấp
                <br />
                các việc làm như,nhân viên sale,kinh
                <br /> doanh,bán hàng
              </p>
              <div className="icon-ground">
                <FacebookIcon style={{ marginRight: 30 }} />
                <InstagramIcon style={{ marginRight: 30 }} />
                <EmailIcon />
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-right-box">
                <p className="link-page-title">Công Việc</p>
                <p className="link-page-item">Sale Bán Hàng</p>
                <p className="link-page-item">Công Nghệ Thông Tin</p>
                <p className="link-page-item">Truyền Thông</p>
              </div>
              <div className="footer-right-box">
                <p className="link-page-title">Bài báo</p>
                <p className="link-page-item">Bài viết phổ biến</p>
                <p className="link-page-item">Đọc nhiều nhất</p>
                <p className="link-page-item">đánh giá Cao</p>
                <p className="link-page-item">Bài viết mới</p>
              </div>
              <div className="footer-right-box">
                <p className="link-page-title">Liên hệ</p>
                <p className="link-page-item">
                  01 2/9 Quận Hải Châu ,Thành Pho đà nẵng
                </p>
                <p className="link-page-item">0925306503</p>
                <p className="link-page-item">nguyenqtthangbinh@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailComponent;
