package com.shop.med.controller;

import com.shop.med.entity.Medicine;
import com.shop.med.entity.MedicineType;
import com.shop.med.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class MedicineController {

    @Autowired
    private MedicineService service;

    @GetMapping({"","index"})
    public String home(Model model){
        List<Medicine> list=service.findAllMedicine();
        model.addAttribute("list",list);  //主页面显示的内容，list包含了所有要展示的药品列表
        List<MedicineType> typeList = service.findAllType();
        model.addAttribute("type_list",typeList);
        return "index";
    }

    @GetMapping("/add")
    public String add(){
        return "addMedicine";
    }

    @GetMapping("/update")
    public String update(@RequestParam("id")int id,Model model){
        Medicine medicine=service.findById(id);
        model.addAttribute("medicine",medicine);
        model.addAttribute("medId",id);
        return "updateMedicine";
    }
}
