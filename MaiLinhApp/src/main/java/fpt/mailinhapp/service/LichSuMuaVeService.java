package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.DatVe;
import fpt.mailinhapp.dto.DatVeDto;
import fpt.mailinhapp.exception.BusesException;
import fpt.mailinhapp.repository.DatVeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LichSuMuaVeService {

    @Autowired
    private DatVeRepository datVeRepository;


    @Transactional(rollbackFor = Exception.class)
    public List<DatVeDto> findAllLichSuMuaVe() {
        List<DatVe> datVeList = datVeRepository.findAll();

        return datVeList.stream()
                .map(datVe -> {
                    ModelMapper modelMapper = new ModelMapper();
                    return modelMapper.map(datVe, DatVeDto.class);
                })
                .collect(Collectors.toList());
    }
}
