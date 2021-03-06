package com.shop.med.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "medicinedetail")//默认表明为类名
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicine implements Serializable {

    private static final long serialVersionUID=594829320797158219L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;  //药品名称

    private String medType;  //药品类型

    private String picture;  //图片位置

    private String commonName;  //通用名

    private String specification;  //特性

    private String approvalNumber;  //许可证书

    private String manufacturer;  //生产厂家

    private String ingredient;  //成分

    private String medCharacter;  //特性

    private String mainFunc;  //主要功效

    private String usageDosage;  //用法用量

    private String untowardEffect;  //不良反应

    private String taboo;  //禁忌

    private String attention;  //注意事项

    private String coEffect;  //药物相互反应

    private String storage;  //保存

    private String packaging;  //包装

    private String expirationDate;  //保质期

    private String checkTime;  //点击次数  //暂时用string后面使用的时候转double或者添加转换函数

}