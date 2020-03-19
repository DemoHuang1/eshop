package com.shop.med.controller;

import com.shop.med.entity.Medicine;
import com.shop.med.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/detail")
public class DetailController {

    @Autowired
    private MedicineService service;


    //根据id删除药品
    @GetMapping(value = "/delete")
    public String deleteById(@RequestParam("id")int id){
        service.deleteById(id);
        return "redirect:/index";
    }

    //添加药品
    @PostMapping("/add")
    public String addMed(Medicine medicine){
        service.add(medicine);
        return "redirect:/index";
    }
<<<<<<< HEAD
    //修改药品
    @PostMapping("/update")
    public String update(@RequestParam("id")int id,Medicine medicine){
        medicine.setId(id);
        service.update(medicine);
        return "redirect:/index";  // return "redirect:/update?id="+id;
    }
=======

>>>>>>> c5a366e1302d43fff240720884f4cc72d73ed739
}
