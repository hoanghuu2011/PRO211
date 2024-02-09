package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.DatVe;
import fpt.mailinhapp.domain.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DatVeRepository extends JpaRepository<DatVe, Long> {
    List<DatVe> findByInfo_SoDTLike(String soDT);

    List<DatVe> findByChuyenXe_MaChuyenAndNgayDi(Long maChuyen, Date ngayDi);


    List<DatVe> findByChuyenXeVe_MaChuyenAndNgayVe(Long maChuyen, Date ngayVe);

    Optional<DatVe> findByThanhToan_Id(String thanhToanId);





    @Query("select month(dv.ngayDatVe) as thang, sum(dv.tongTien) as tongTien from DatVe dv where year(dv.ngayDatVe) = :nam group by month(dv.ngayDatVe), year(dv.ngayDatVe) order by month(dv.ngayDatVe), year(dv.ngayDatVe)" )
    List<Object[]> thongKeTheoThang(@Param("nam") int nam);

    @Query("select month(dv.ngayDatVe) as thang, sum(dv.soLuong) as tongTien from DatVe dv where year(dv.ngayDatVe) = :nam group by month(dv.ngayDatVe), year(dv.ngayDatVe) order by month(dv.ngayDatVe), year(dv.ngayDatVe)" )
    List<Object[]> thongKeVe(@Param("nam") int nam);
}