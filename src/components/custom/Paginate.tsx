import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
interface PaginateProps {
  page: number;
  pages: number;
  isAdmin?: boolean;
  keyword?: string;
}

const Paginate: React.FC<PaginateProps> = ({ page, pages, isAdmin = false, keyword = "" }) => {
  return (
    <div>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default Paginate;
