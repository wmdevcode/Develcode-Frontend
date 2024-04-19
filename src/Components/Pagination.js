import React from 'react';

const Pagination = ({currentPage, quantidadeShow, paginaMinima, postsPerPage, totalPosts, paginate, paginateScroll }) => {
    const pageNumbers = [];

    for (let i = paginaMinima; i <= Math.ceil((totalPosts / postsPerPage)); i++) {
        pageNumbers.push(i);
    }
    return (


      

        <div className="col-lg-12">
            {pageNumbers.length>1? 
              <div className="row">
            
           
            <ul class="pagination pagination-sm pagination-container" style={{'overflow': 'hidden'}}>
                <li class="page-item">
                    <a class="page-link" onClick={() => paginateScroll(-quantidadeShow)}style={{color:'white'}}>&laquo;</a>
                </li>
                {pageNumbers.map((number,index) => (
                    number <= paginaMinima + quantidadeShow-1?
                    currentPage != number ?
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link' style={{color:'white'}}>
                            {number}
                        </a>
                    </li>
                    :
                    <li key={number} className='page-item '>
                    <a onClick={() => paginate(number)} className='page-link' style={{color:'white'}}>
                            {number}
                    </a>
                </li>
                    :false
                ))}
                <li class="page-item">
                    <a class="page-link" onClick={() => paginateScroll(quantidadeShow)} style={{color:'white'}}> &raquo;</a>
                </li>
            </ul>
        </div>:false}
         </div>
    );
};

export default Pagination;