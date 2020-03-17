package com.shop.med.service;

import com.shop.med.dao.MedicineDao;
import com.shop.med.entity.Medicine;
import com.shop.med.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineDao medicineDao;

    @Autowired
    private IdWorker idWorker;
    /*
    增删改查
     */
    public void add(Medicine medicine){
        String id=idWorker.nextId()+"";
        medicine.setId(id);
        medicineDao.save(medicine);  //未做重复检查
    }

    public void delete(Medicine medicine){
        medicineDao.deleteById(medicine.getId());
    }

    public void update(Medicine medicine){
        Medicine tmp=medicineDao.findById(medicine.getId()).get();
        tmp.setName(medicine.getName());
        tmp.setCharacter(medicine.getCharacter());
        tmp.setMainFunction(medicine.getMainFunction());
        tmp.setPicture(medicine.getPicture());  //修改图片、名称、特性这些，后期有需要可以添加修改项
        medicineDao.save(tmp);
    }

    public Medicine findById(String id){
        return medicineDao.findById(id).get();
    }

    public List<Medicine> findAll(){
        return medicineDao.findAll();
    }

    public void deleteById(String id){
        medicineDao.deleteById(id);
    }
}
