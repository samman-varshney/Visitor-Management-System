import nodemailer from "nodemailer";
import QRCode from "qrcode";

let transporterInstance: nodemailer.Transporter | null = null;

// ✅ Singleton Transporter
const getTransporter = () => {
  if (!transporterInstance) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("SMTP credentials not configured");
    }

    transporterInstance = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return transporterInstance;
};

class EmailService {
  private transporter = getTransporter();

  // 🔹 Common sender
  private getFrom() {
    return process.env.SMTP_FROM || "noreply@visitormanagement.com";
  }

  // 🔹 Common send method
  private async sendMail(options: nodemailer.SendMailOptions) {
    return this.transporter.sendMail({
      from: this.getFrom(),
      ...options,
    });
  }

  // 🔹 QR Generator
  private async generateQR(data: string) {
    return QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
    });
  }

  // =====================================================
  // 📩 METHODS
  // =====================================================

  async sendVisitorRequestEmail(
    employeeEmail: string,
    employeeName: string,
    visitorData: any,
  ) {
    const approveUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/requests?id=${visitorData.requestId}&action=approve`;
    const denyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/requests?id=${visitorData.requestId}&action=deny`;

    return this.sendMail({
      to: employeeEmail,
      subject: `🔔 New Visitor Request - ${visitorData.name}`,
      html: `
        <h2>New Visitor Request</h2>
        <p>Hi ${employeeName},</p>
        <p><b>Name:</b> ${visitorData.name}</p>
        <p><b>Email:</b> ${visitorData.email}</p>
        <p><b>Phone:</b> ${visitorData.phone}</p>
        <p><b>Purpose:</b> ${visitorData.purpose}</p>

        <a href="${approveUrl}">Approve</a> |
        <a href="${denyUrl}">Deny</a>
      `,
    });
  }

  async sendApprovalEmailWithQR(
    visitorEmail: string,
    visitorName: string,
    qrData: string,
    visitDetails: any,
  ) {
    const qr = await this.generateQR(qrData);

    return this.sendMail({
      to: visitorEmail,
      subject: `✅ Visit Approved`,
      html: `
        <h2>Visit Approved</h2>
        <p>Hi ${visitorName},</p>
        <img src="${qr}" width="200"/>
        <p><b>Meeting With:</b> ${visitDetails.employeeName}</p>
        <p><b>Purpose:</b> ${visitDetails.purpose}</p>
        <p><b>Date:</b> ${new Date(visitDetails.date).toLocaleDateString()}</p>
      `,
    });
  }

  async sendPreApprovalEmail(
    visitorEmail: string,
    visitorName: string,
    qrData: string,
    details: any,
  ) {
    const qr = await this.generateQR(qrData);

    return this.sendMail({
      to: visitorEmail,
      subject: `📅 Pre-Approved Visit`,
      html: `
        <h2>Pre-Approved Visit</h2>
        <p>Hi ${visitorName},</p>
        <img src="${qr}" width="200"/>
        <p><b>Meeting With:</b> ${details.employeeName}</p>
        <p><b>Date:</b> ${new Date(details.scheduledDate).toLocaleDateString()}</p>
        <p><b>Time:</b> ${details.scheduledTime}</p>
      `,
    });
  }

  async sendDenialEmail(
    visitorEmail: string,
    visitorName: string,
    employeeName: string,
    reason?: string,
  ) {
    return this.sendMail({
      to: visitorEmail,
      subject: "Visit Request Update",
      html: `
        <h2>Visit Denied</h2>
        <p>Hi ${visitorName},</p>
        <p>Your request to meet ${employeeName} was denied.</p>
        ${reason ? `<p><b>Reason:</b> ${reason}</p>` : ""}
      `,
    });
  }

  async sendCheckoutNotification(
    employeeEmail: string,
    employeeName: string,
    visitorData: any,
  ) {
    return this.sendMail({
      to: employeeEmail,
      subject: `Visitor Checked Out`,
      html: `
        <h2>Visitor Checkout</h2>
        <p>Hi ${employeeName},</p>
        <p><b>Visitor:</b> ${visitorData.name}</p>
        <p><b>Check-in:</b> ${new Date(visitorData.checkInTime).toLocaleString()}</p>
        <p><b>Check-out:</b> ${new Date(visitorData.checkOutTime).toLocaleString()}</p>
        <p><b>Duration:</b> ${visitorData.duration}</p>
      `,
    });
  }
}

export const emailService = new EmailService();
