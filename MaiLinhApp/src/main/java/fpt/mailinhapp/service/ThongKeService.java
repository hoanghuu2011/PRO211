package fpt.mailinhapp.service;

import fpt.mailinhapp.repository.DatVeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ThongKeService {
    @Autowired
    DatVeRepository dao;

    public List<Object[]> thongKeDoanhThuNam(Integer nam) {
        var list = dao.thongKeTheoThang(nam);
        return list;
    }
    public List<Long> thongKeDoanhThuQuy(Integer nam){
        Long q1 = 0L;
        Long q2 = 0L;
        Long q3 = 0L;
        Long q4 = 0L;
        var list = dao.thongKeTheoThang(nam);
        List<Long> listData = new ArrayList<>();
        for (Object[] row : list) {
            Integer thang = (Integer) row[0];
            if(thang >=1 && thang <=3){
                Long tien = (Long) row[1];
                q1 += tien;
            }
            if(thang >=4 && thang <=6){
                Long tien = (Long) row[1];
                q2 += tien;
            }
            if(thang >=7 && thang <=9){
                Long tien = (Long) row[1];
                q3 += tien;
            }
            if(thang >=10 && thang <=12){
                Long tien = (Long) row[1];
                q4 += tien;
            }
        }
        listData.add(q1);
        listData.add(q2);
        listData.add(q3);
        listData.add(q4);
        return listData;
    }

    public List<Object[]> thongKeVeNam(Integer nam) {
        var list = dao.thongKeVe(nam);
        return list;
    }

    public List<Long> thongKeVeQuy(Integer nam){
        Long q1 = 0L;
        Long q2 = 0L;
        Long q3 = 0L;
        Long q4 = 0L;
        var list = dao.thongKeVe(nam);
        List<Long> listData = new ArrayList<>();
        for (Object[] row : list) {
            Integer thang = (Integer) row[0];
            if(thang >=1 && thang <=3){
                Long tien = (Long) row[1];
                q1 += tien;
            }
            if(thang >=4 && thang <=6){
                Long tien = (Long) row[1];
                q2 += tien;
            }
            if(thang >=7 && thang <=9){
                Long tien = (Long) row[1];
                q3 += tien;
            }
            if(thang >=10 && thang <=12){
                Long tien = (Long) row[1];
                q4 += tien;
            }
        }
        listData.add(q1);
        listData.add(q2);
        listData.add(q3);
        listData.add(q4);
        return listData;
    }
}
