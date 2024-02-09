package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.*;
import fpt.mailinhapp.dto.XeDto;
import fpt.mailinhapp.exception.CarsException;
import fpt.mailinhapp.repository.AnhDaLuuRepository;
import fpt.mailinhapp.repository.XeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service


public class CarService {
    @Autowired
    XeRepository dao;
    @Autowired
    AnhDaLuuRepository imgDao;
    @Autowired
    FileStorageService imgService;

    @Transactional(rollbackFor = Exception.class)
    public XeDto createCar(XeDto dto){
        var found = dao.findById(dto.getBienSoXe());
        if(found.isPresent()){
            throw new CarsException("Biển số xe đã tồn tại");
        }

        String[] listIgone = {"anhDaluu", "thuonghieu", "loaiXe", "nhaXe"};



        Xe entity = new Xe();
        LoaiXe loai = new LoaiXe();

        NhaXe nx = new NhaXe();

        BeanUtils.copyProperties(dto, entity,listIgone);
        BeanUtils.copyProperties(dto.getLoaiXe(),loai);

        BeanUtils.copyProperties(dto.getNhaXe(), nx);


        entity.setLoaiXe(loai);
        entity.setNhaXe(nx);

        if(dto.getAnhDaLuu() != null){
            AnhDaLuu img = new AnhDaLuu();
            BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
            var imgSave = imgDao.save(img);
            entity.setAnhDaLuu(imgSave);

        }



        dao.save(entity);

        return dto;

    }

    @Transactional(rollbackFor = Exception.class)
    public XeDto updateCar(String id, XeDto dto){
        var found =  dao.findById(id).orElseThrow(()-> new CarsException("Xe không tồn tại"));

        String[] listIgone = {"anhDaluu", "thuonghieu", "loaiXe", "nhaXe"};
        BeanUtils.copyProperties(dto, found,listIgone);

        if(dto.getNhaXe() != null){
            NhaXe nx = new NhaXe();
            BeanUtils.copyProperties(dto.getNhaXe(), nx);
            found.setNhaXe(nx);
        }

        if(dto.getLoaiXe() != null){
            LoaiXe nx = new LoaiXe();
            BeanUtils.copyProperties(dto.getLoaiXe(), nx);
            found.setLoaiXe(nx);
        }

        if(dto.getAnhDaLuu() != null){
            AnhDaLuu img = new AnhDaLuu();
            BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
            var imgSave = imgDao.save(img);
            found.setAnhDaLuu(imgSave);

        }



        dao.save(found);



        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteCar(String id){
        var found = dao.findById(id).orElseThrow(()->new CarsException("Xe không tồn tại"));
        dao.delete(found);
    }
    public XeDto findById(String id){
        var found = dao.findById(id).orElseThrow(()-> new CarsException("Xe không tồn tại"));
        ModelMapper mapper = new ModelMapper();
        return mapper.map(found, XeDto.class);
    }
    public List<Xe> findAll() {
        return dao.findAll();
    }
}
