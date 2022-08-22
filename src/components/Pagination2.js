import propTypes from "prop-types";

const Pagination = ({currentPage, numberOfPages, onClick, limit }) =>{
    /* const currentSet = Math.ceil(currentPage/limit);  // 셋트 시작페이지 계산
    const lastSet = Math.ceil(numberOfPages/limit);
    const startPage = limit * (currentSet -1) + 1; */
    //console.log(startPage);

    // 마지막 페이지 레코드 계산
    //const numberOfPageForSet = currentSet === lastSet ? numberOfPages%limit : limit;

    return (
    
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
        <li className="page-item disabled">
            <a className="page-link" href="#"> Previous  </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item">
          <a className="page-link" href="#">   Next  </a>
        </li>
    </ul>
</nav>

    )
 }
   
Pagination.propTypes = {
    currentPage: propTypes.number,
    numberOfPages: propTypes.number.isRequired,
    onClick: propTypes.func.isRequired,
    limit: propTypes.number
}

Pagination.defaultProps = {
    currentPage: 1,
    limit: 5
}
export default Pagination;