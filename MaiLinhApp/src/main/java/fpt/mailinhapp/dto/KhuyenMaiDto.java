package fpt.mailinhapp.dto;

import lombok.Value;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link fpt.mailinhapp.domain.KhuyenMai}
 */
@Value
public class KhuyenMaiDto implements Serializable {
    Long maKhuyenMai;
    String tenKhuyenMai;
    String moTa;
    Date ngayBatDau;
    Date ngayKetThuc;
    Integer soLuong;
    Float mucGiamGia;
}