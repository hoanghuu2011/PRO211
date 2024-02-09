package fpt.mailinhapp.adminController;

import fpt.mailinhapp.domain.AnhDaLuu;
import fpt.mailinhapp.dto.AnhDaLuuDto;
import fpt.mailinhapp.exception.FileStorageException;
import fpt.mailinhapp.repository.AnhDaLuuRepository;
import fpt.mailinhapp.service.FileStorageService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/images")
@CrossOrigin
public class ImageController {
    @Autowired
    FileStorageService service;

    @Autowired
    AnhDaLuuRepository dao;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity uploadImage(@RequestParam("file")MultipartFile imgFile){
        var fileInfo = service.storeUploadImage(imgFile);

        AnhDaLuuDto dto = new AnhDaLuuDto();
        dto.setTenTep(fileInfo.getFileName());
        dto.setTenAnh(fileInfo.getName());

        AnhDaLuu img = new AnhDaLuu();
        img.setTenTep(dto.getTenTep());
        img.setTenAnh(dto.getTenAnh());
        dao.save(img);

        dto.setId(img.getId());
        dto.setStatus("done");
        dto.setUrl("http://localhost:8080/api/v1/images/" + fileInfo.getFileName());

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping("{filename:.+}")
    public ResponseEntity dowFile(@PathVariable String filename, HttpServletRequest req){

        Resource resource = service.loadImageResource(filename);
        String contenType = null;

        try {
            contenType = req.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch (Exception ex){
            throw new FileStorageException("Không thể xác định loại tệp.");
        }
        if(contenType == null){
            contenType = "application/octet-stream";
        }
        return  ResponseEntity.ok().contentType(MediaType.parseMediaType(contenType)).
                header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename\""
                        + resource.getFilename()+"\"").body(resource);
    }

    @DeleteMapping("{filename:.+}")
    public ResponseEntity deleteImg(@PathVariable String filename, HttpServletRequest req){
        service.deleteImage(filename);
        var imgDelete = dao.findByTenTepLike(filename);
        dao.delete(imgDelete);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
