import React, { useEffect, useState } from 'react';
import '../css/tracuu.css';
import { connect } from 'react-redux';
import withRouter from '../helpers/withRouter';
import { gethistory } from '../redux/actions/actionOrderhistory';

function Tracuu(props) {
  const { navigate } = props.router;
  useEffect(() => {
    document.title = 'Tra cứu';

    return () => {
      document.title = 'Mai Linh TOUR';
    };
  }, []);

  const handleSearchClick = () => {
    const mave = document.getElementById('ticketNumber').value;
    // Gọi hàm gethistory từ props
    props.gethistory(mave, navigate);
  };

  return (
    <div className="tracuu">
      <h1 className="mb-4">Tra cứu thông tin đặt vé</h1>
      <div className="search-input-container">
        <input className="search-input" id="ticketNumber" placeholder="Vui lòng nhập mã vé" />
        <span className="placeholder-label">Mã vé</span>
      </div>
      {/* Gọi handleSearchClick khi nút "Tra cứu" được nhấp */}
      <button className="search-button" onClick={handleSearchClick}>
        Tra cứu
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  listData: state.Oderhistory.listData,
});

const mapDispatchToProps = {
  gethistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tracuu));
