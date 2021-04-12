package com.rib.rib.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIgnore;
@MappedSuperclass
public class Request {
 @Id
 @GeneratedValue(strategy = GenerationType.TABLE)
 public Long requestId;
 @Column
 public Date date;
 @Column
 public String status;
 @ManyToOne
 @JsonIgnore
 @JoinColumn(name="customer_Id")
 public Customer customer;

public Request()
{
	
}

public Request(Date date, String status,Customer customer) {
	super();
	this.date = date;
	this.status = status;
	this.customer=customer;
}

public Date getDate() {
	return date;
}

public void setDate(Date date) {
	this.date = date;
}

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}

public Customer getCustomer() {
	return customer;
}

public void setCustomer(Customer customer) {
	this.customer = customer;
}

}
