package com.lemonsoftware.extjsplugin.bean;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@XmlRootElement
public class BaseResponse extends AbstractBean {

	private static final long serialVersionUID = -112193368280872481L;

	private boolean success;
	private String message;
	private Object data;

	/**
	 * Using only by Json serializer
	 */
	@Deprecated
	public BaseResponse() {
	}

	private BaseResponse(Builder builder) {
		this.success = builder.success;
		this.message = builder.message;
		this.data = builder.data;
	}

	public boolean isSuccess() {
		return success;
	}

	@Deprecated
	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	@Deprecated
	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	@Deprecated
	public void setData(Object data) {
		this.data = data;
	}

	public static class Builder {

		private	boolean success;
		private String message;
		private Object data;

		public Builder success(boolean success) {
			this.success = success;
			return this;
		}

		public Builder message(String message) {
			this.message = message;
			return this;
		}

		public Builder data(Object data) {
			this.data = data;
			return this;
		}

		public BaseResponse build() {
			return new BaseResponse(this);
		}
	}
}
