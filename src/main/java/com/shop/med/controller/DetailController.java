package com.shop.med.controller;

import com.shop.med.entity.Medicine;
import com.shop.med.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/details")
public class DetailController {

    @Autowired
    private MedicineService service;

    //根据id显示药品
    @GetMapping(value = "")
    public String showDetail(@RequestParam("id")int id, Model model){
        Medicine detail=service.findById(id);
        model.addAttribute("detail",detail);
        return "detail";
    }

    //根据id删除药品
    @GetMapping(value = "/delete")
    public String deleteById(@RequestParam("id")int id){
        service.deleteById(id);
        return "redirect:/home";
    }

    //添加药品
    @PostMapping("/add")
    public String addMed(Medicine medicine){
        service.add(medicine);
        return "redirect:/home";
    }
    //修改药品
    @PostMapping("/update")
    public String update(@RequestParam("id")int id,Medicine medicine){
        medicine.setId(id);
        service.update(medicine);
        return "redirect:/home";  //此处可以跳转到修改后的详情，没这样写，如果要这样写再改，累
    }
}
