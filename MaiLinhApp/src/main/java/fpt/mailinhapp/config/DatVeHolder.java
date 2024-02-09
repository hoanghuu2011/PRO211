package fpt.mailinhapp.config;

import fpt.mailinhapp.dto.DatVeDto;
import org.springframework.stereotype.Component;

@Component
public class DatVeHolder {
    private DatVeDto trunggian;

    public DatVeDto getTrunggian() {
        return trunggian;
    }

    public void setTrunggian(DatVeDto trunggian) {
        this.trunggian = trunggian;
    }
}