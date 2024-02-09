package fpt.mailinhapp.onlinePay;

import fpt.mailinhapp.config.DatVeHolder;
import fpt.mailinhapp.dto.*;

import fpt.mailinhapp.service.ChuyenXeService;
import fpt.mailinhapp.service.EmailService;
import org.springframework.ui.Model;
import fpt.mailinhapp.service.PayMentService;
import fpt.mailinhapp.service.VeXeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Controller
@CrossOrigin("*")
@RequestMapping("api/v1/payment")
public class PayController {
    @Autowired
    private EmailService emailService;
    @Autowired
    PayMentService service;
    @Autowired
    VeXeService veXeService;
    @Autowired
    ChuyenXeService chuyenXeService;
    @Autowired
    private DatVeHolder datVeHolder;


    @PostMapping()
    public ResponseEntity createPayment(@RequestBody Map<String, Object> requestData) throws UnsupportedEncodingException, ParseException {
        DatVeDto trungGian = new DatVeDto();
        ModelMapper mapper = new ModelMapper();
        ChuyenXeDto cx = mapper.map(requestData.get("chuyenXe"), ChuyenXeDto.class);
        String nt = String.valueOf(requestData.get("noiTra"));
        InfoDto info = mapper.map(requestData.get("info"), InfoDto.class);
        Integer soLuong = (Integer) requestData.get("soLuong");
        Integer tongTienInteger = (Integer) requestData.get("tongTien");
        List<String> choNgoi = (List<String>) requestData.get("choNgoi");
        List<String> choNgoi2 = (List<String>) requestData.get("choNgoi2");




        Long tien = tongTienInteger != null ? Long.valueOf(tongTienInteger) : null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date ngayDi = dateFormat.parse((String) requestData.get("ngayDi"));
        trungGian.setNgayDi(ngayDi);
        if(requestData.get("ngayVe") != null){
            Date ngayVe = dateFormat.parse((String) requestData.get("ngayVe"));
            trungGian.setNgayVe(ngayVe);
        }

        if(requestData.get("chuyenXeVe") != null){
            ChuyenXeDto cxv = mapper.map(requestData.get("chuyenXeVe"), ChuyenXeDto.class);
            trungGian.setChuyenXeVe(cxv);
        }



        trungGian.setInfo(info);
        trungGian.setChuyenXe(cx);
        trungGian.setChoNgoi(choNgoi);
        trungGian.setChoNgoi2(choNgoi2);
        trungGian.setNoiTra(nt);
        trungGian.setTongTien(tien);
        trungGian.setSoLuong(soLuong);
        datVeHolder.setTrunggian(trungGian);
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = tien*100;
        String bankCode = "";
        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";

        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", Config.vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);


        vnp_Params.put("vnp_Locale", "vn");

        vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {

                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        var list1 = chuyenXeService.getCho(cx.getMaChuyen(), ngayDi);
        var list2 = chuyenXeService.getCho2(cx.getMaChuyen(), ngayDi);
        var listTest = Stream.concat(list1.stream(), list2.stream()).collect(Collectors.toList());
        boolean check = choNgoi.stream().anyMatch(listTest::contains);
        if(check){
            return new ResponseEntity<>("http://localhost:3000/datvethatbai", HttpStatus.OK);
        }
        if(trungGian.getChuyenXeVe() != null){
            var list3 = chuyenXeService.getCho(trungGian.getChuyenXeVe().getMaChuyen(), trungGian.getNgayVe());
            var list4 = chuyenXeService.getCho2(trungGian.getChuyenXeVe().getMaChuyen(), trungGian.getNgayVe());
            var listCheck = Stream.concat(list3.stream(), list4.stream()).collect(Collectors.toList());
            boolean check2 = choNgoi2.stream().anyMatch(listCheck::contains);
            if(check){
                return new ResponseEntity<>("http://localhost:3000/datvethatbai", HttpStatus.OK);
            }
        }

        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
        PaymentResDto dto = new PaymentResDto();
        dto.setStatus("ok");
        dto.setMessage("successfully");
        dto.setUrl(paymentUrl);

        return new ResponseEntity(paymentUrl, HttpStatus.OK);
    }

    @GetMapping("pay_return")
    public String payInfo(@RequestParam("vnp_Amount") Long amount,
                          @RequestParam("vnp_BankCode") String bankCode,
                          @RequestParam("vnp_OrderInfo") String orderInfo,
                          @RequestParam("vnp_PayDate") String payDate,
                          @RequestParam("vnp_TransactionNo") String transactionNo,
                          @RequestParam("vnp_TransactionStatus") String transactionStatus,
                          Model model) throws ParseException {
        DatVeDto trunggian = datVeHolder.getTrunggian();

        DateTimeFormatter sdf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        LocalDateTime datePay = LocalDateTime.parse(payDate, sdf);
        ThanhToanDto dto = new ThanhToanDto();

        dto.setId(transactionNo);
        dto.setPayDate(datePay);
        dto.setOrderInfo(orderInfo);
        dto.setBank(bankCode);
        dto.setAmount(amount);
        if (transactionStatus.equalsIgnoreCase("00")) {
            dto.setStatus(true);
            service.save(dto);
            trunggian.setThanhToan(dto);
            veXeService.createVe(trunggian);
            String toEmail = trunggian.getInfo().getEmail();
            String statusMessage = trunggian.getThanhToan().getStatus() ? "Thành công" : "Thất bại";
            String subject = "Thanh toán " + statusMessage + " cho đơn hàng - Order #" + dto.getId();
            String redirectUrl = "redirect:http://localhost:3000/thongtinve/" + dto.getId();
            String text = "Cảm ơn Quý khách đã sử dụng dịch vụ của MAILINHTOUR." +
                    "!<br>" +
                    "MAILINH xin thông báo giao dịch của Quý khách đã được thực hiện như sau:" +
                    "<br>" +
                    "<br>" +
                    "ID: " + dto.getId() + "<br>" +
                    "Tên Khách hàng:" + trunggian.getInfo().getHoTen()+ "<br>" +
                    "Số ghế:" + trunggian.getChoNgoi()+ "<br>";
            if (trunggian.getChoNgoi2() != null && !trunggian.getChoNgoi2().isEmpty()) {
                text += "Số ghế 2: " + trunggian.getChoNgoi2() + "<br>";
            }
            text +=  "Tổng tiền: " + trunggian.getTongTien() + " VND<br>" +
                    "Ngày đặt: " + dto.getPayDate()+ "<br>" +
                    "Tình trạng: " + statusMessage + "<br>" +
                    "Thông tin chi tiết xin vui lòng check trong lịch sử giao dịch cửa website:" + redirectUrl + "<br>" ;
            emailService.sendEmail(toEmail, subject, text);

            return redirectUrl;

        } else {
            dto.setStatus(false);
            String redirectUrl = "redirect:http://localhost:3000/datvethatbai";
            return redirectUrl;
        }



    }

}
