package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.NhanVien;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NhanVienRepository extends CrudRepository<NhanVien, String> {
    @Query(value = "select * from nhan_vien nv join chuyen_xe_nhan_viens cx on nv.so_cccd = cx.nhan_viens_so_cccd",nativeQuery = true)
    List<NhanVien> findNhanVienWithChuyenXe();

    List<NhanVien> findByNhaXe_Id(Long id);



}