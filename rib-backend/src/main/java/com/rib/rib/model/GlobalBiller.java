package com.rib.rib.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "global_biller")
public class GlobalBiller {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @Column
	private String billerName;

    @Column
    private String billerType;
    
    
	public GlobalBiller()
	{
	}
	
	public GlobalBiller(String billerName, String billerType) {
		super();
		this.billerName = billerName;	
		this.billerType = billerType; 
	}

	public String getBillerName() {
		return billerName;
	}

	public void setBillerName(String billerName) {
		this.billerName = billerName;
	}

	public String getBillerType() {
		return billerType;
	}

	public void setBillerType(String billerType) {
		this.billerType = billerType;
	}
	
	
	

}
