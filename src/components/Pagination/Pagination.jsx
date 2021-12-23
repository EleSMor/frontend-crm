import './Pagination.scss'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
/* import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai"; */

const Pagination = ({ qPerPage, totalQ, paginate, currentPage}) => {
  const pageNumbers = []

  for (let i = 1; i<= Math.ceil(totalQ / qPerPage); i++) {
    pageNumbers.push(i)
  }

  const addPage = (n) => (n === pageNumbers.length ? pageNumbers.length : currentPage + 1)
  const subPage = (n) => (n === 1 ? 1 : currentPage - 1)

  return (
    <div className='Pagination'>
      {/* <button onClick={() => paginate(1)}><AiOutlineVerticalRight /></button> */}
      <button onClick={() => paginate(subPage)}><AiOutlineDoubleLeft /></button>
        <small>Página {currentPage} de {pageNumbers.length}</small>
      <button onClick={() => paginate(addPage)}><AiOutlineDoubleRight /></button>
      {/* <button onClick={() => paginate(pageNumbers.length)}><AiOutlineVerticalLeft /></button> */}
    </div>
  )
}

export default Pagination
