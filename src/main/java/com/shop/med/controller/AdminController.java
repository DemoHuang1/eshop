package com.shop.med.controller;

import com.shop.med.entity.Medicine;
import com.shop.med.entity.MedicineType;
import com.shop.med.service.MedicineService;
import com.sun.corba.se.impl.corba.RequestImpl;
import com.sun.xml.fastinfoset.tools.FI_DOM_Or_XML_DOM_SAX_SAXEvent;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.InetAddress;
import java.util.List;
import java.util.UUID;

@Controller
public class AdminController {
    @Autowired
    ResourceLoader resourceLoader;
    @Autowired
    MedicineService service;
    @GetMapping(value = "/admin")
    public String findAll(Model model){
        model.addAttribute("list",service.findAllMedicine());

        return "manager";
    }

    @GetMapping(value = "/manage_medicine")
    public String findProduct(@RequestParam("id")int id, Model model){
        List<MedicineType> typeList = service.findAllType();
        model.addAttribute("type_list",typeList);
        model.addAttribute("detail",service.findById(id));
        return "manage_detail";
    }

    @PostMapping("/uploadImage")
    public String upload(HttpServletRequest request, @RequestParam("image")MultipartFile file, @RequestParam("id")int id){
        try {
            String homePath = System.getProperty("user.home");
            String imgPath = "/images/";
            String originalName = file.getOriginalFilename();
            String suffix = originalName.substring(originalName.indexOf("."));
            File dir = new File(imgPath);
            if(!dir.exists()) dir.mkdirs();
            File localFile = new File(homePath+imgPath+ UUID.randomUUID().toString().replace("-","")+suffix);
            if(!localFile.exists()) localFile.createNewFile();
            file.transferTo(localFile);
            Medicine m = service.findById(id);
            m.setPicture("images/" + localFile.getName());
            service.update(m);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String referer = request.getHeader("Referer");
        return "redirect:"+referer;
    }

    @PostMapping(value = "/update")
    public String update(HttpServletRequest request,@RequestParam("id")int id,Medicine bean){
        Medicine m = service.findById(id);
        bean.setPicture(m.getPicture());
        service.update(bean);
        return "redirect:/admin";
    }
}
