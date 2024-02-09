package fpt.mailinhapp.service;

import fpt.mailinhapp.config.FileStorageProperties;
import fpt.mailinhapp.dto.UploadFileInfo;
import fpt.mailinhapp.exception.FileNotFoundException;
import fpt.mailinhapp.exception.FileStorageException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    private final Path fileImageStorageLocation;

    public FileStorageService(FileStorageProperties properties){
        this.fileImageStorageLocation = Paths.get(properties.getUploadImageDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(fileImageStorageLocation);
        }catch (Exception ex){
            throw new FileStorageException("Không thể tạo thư mục lưu trữ ảnh",ex);
        }
    }

    private String storeFile(Path location, MultipartFile file){
        UUID uuid = UUID.randomUUID();

        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String fileName = uuid.toString() + "." + ext;

        try {
            if(fileName.contains("..")){
                throw new FileStorageException("Xin lỗi! tên file chứa kí tự đặc biệt" + fileName);
            }

            Path targetLocation = location.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        }catch (Exception ex){
            throw new FileStorageException("Không thể lưu file "+ fileName + ". Vui lòng thử lại.", ex);
        }
    }

    private UploadFileInfo storeUploadFile(Path location, MultipartFile file){
        UUID uuid = UUID.randomUUID();

        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String fileName = uuid.toString() + "." + ext;

        try {
            if(fileName.contains("..")){
                throw new FileStorageException("Xin lỗi! tên file chứa kí tự đặc biệt" + fileName);
            }

            Path targetLocation = location.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            UploadFileInfo info = new UploadFileInfo();
            info.setFileName(fileName);
            info.setUid(uuid.toString());
            info.setName(StringUtils.getFilename(file.getOriginalFilename()));

            return info;
        }catch (Exception ex){
            throw new FileStorageException("Không thể lưu file "+ fileName + ". Vui lòng thử lại.", ex);
        }
    }

    private Resource loadFileResource(Path location, String fileName){
        try {
            Path filePath = location.resolve(fileName).normalize();

            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists()){
                return resource;
            }else{
                throw new FileNotFoundException("Không tìm thấy file" + fileName);
            }
        }catch (Exception ex){
            throw new FileNotFoundException("Không tìm thấy file" + fileName);
        }
    }

    private void deleteFile(Path location, String fileName){
        try {
            Path filePath = location.resolve(fileName).normalize();

            if(!Files.exists(filePath)){
                throw new FileNotFoundException("Không tìm thấy file" + fileName);
            }

            Files.delete(filePath);
        }catch (Exception e){
            throw new FileNotFoundException("Không tìm thấy file" + fileName);
        }
    }

    public String storeImageFile(MultipartFile file){return storeFile(fileImageStorageLocation, file);}
    public UploadFileInfo storeUploadImage(MultipartFile file){return storeUploadFile(fileImageStorageLocation,file);}
    public Resource loadImageResource(String filename){return loadFileResource(fileImageStorageLocation, filename);}
    public void deleteImage(String filename){deleteFile(fileImageStorageLocation, filename);}

}
