package com.lemonsoftware.extjsplugin.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

public class Department extends AbstractBean {

	private static final long serialVersionUID = -8107820225214858066L;

	private Long id;
	private String name;

	/**
	 * Default constructor
	 */
	public Department() {
	}

	/**
	 * Constructor with additional params
	 *
	 * @param id - unique identifier;{java.lang.Long}
	 * @param name -  name;{java.lang.String}
	 */
	public Department(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@JsonProperty(value = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder()
				.appendSuper(super.hashCode()).append(this.name)
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
		final Department other = (Department) obj;
		return new EqualsBuilder()
				.appendSuper(super.equals(obj))
				.append(this.id, other.id)
				.append(this.name, other.name)
				.isEquals();
	}

	@Override
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", id)
				.append("name", name)
				.toString();
	}
}
