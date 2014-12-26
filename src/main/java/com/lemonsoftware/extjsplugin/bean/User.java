package com.lemonsoftware.extjsplugin.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;



public class User extends AbstractBean {

	private static final long serialVersionUID = -8107820225214858066L;

	private Long id;
	private String firstName;
	private String lastName;
	private String userName;
	private Department department;



	/**
	 * Default constructor
	 */
	public User() {
	}

	/**
	 * Constructor with additional params
	 *
	 * @param id - unique identifier;{java.lang.Long}
	 * @param firstName - first name;{java.lang.String}
	 * @param lastName - last name;{java.lang.String}
	 * @param userName - user name;{java.lang.String}
	 */
	public User(Long id, String firstName, String lastName, String userName, Long departmentId) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.department = new Department();
		department.setId(departmentId);
	}

	@JsonProperty(value = "department")
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@JsonProperty(value = "firstname")
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@JsonProperty(value = "lastname")
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@JsonProperty(value = "username")
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder()
				.appendSuper(super.hashCode()).append(this.firstName)
				.append(this.lastName).append(this.userName)
				.toHashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final User other = (User) obj;
		return new EqualsBuilder()
				.appendSuper(super.equals(obj))
				.append(this.id, other.id)
				.append(this.firstName, other.firstName)
				.append(this.lastName, other.lastName)
				.append(this.userName, other.userName)
				.append(this.department, other.department)
				.isEquals();
	}

	@Override
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", id)
				.append("firstName", firstName)
				.append("lastName", lastName)
				.append("userName", userName)
				.append("department", department.getName())
				.toString();
	}
}
