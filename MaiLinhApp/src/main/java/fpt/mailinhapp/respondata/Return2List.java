package fpt.mailinhapp.respondata;

import fpt.mailinhapp.dto.ChuyenXeDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Return2List {
    private List<ChuyenXeDto> chuyen1;
    private List<ChuyenXeDto> chuyen2;
}
