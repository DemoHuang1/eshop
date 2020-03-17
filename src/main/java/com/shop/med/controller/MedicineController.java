package com.shop.med.controller;

import com.shop.med.entity.Medicine;
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
@RequestMapping(value = "home")
public class MedicineController {

    @Autowired
    private MedicineService service;

    @GetMapping()
    public String home(Model model){
        List<Medicine> list=service.findAll();
        model.addAttribute("list",list);  //主页面显示的内容，list包含了所有要展示的药品列表
        return "/home";
    }

    @GetMapping("/add")
    public String add(){
        return "addMedicine";
    }

    @GetMapping("/update")
    public String update(@RequestParam("id")String id,Model model){
        Medicine medicine=service.findById(id);
        model.addAttribute("medicine",medicine);
        model.addAttribute("medId",id);
        return "updateMedicine";
    }

//    @GetMapping("/update")
//    public ModelAndView update(@RequestParam("id")String id,ModelAndView view){
//        view.setViewName("updateMedicine");
//        Medicine medicine=service.findById(id);
//        view.addObject("medicine",medicine);
//        return view;
//    }
}
