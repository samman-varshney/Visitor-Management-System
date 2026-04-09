export type VisitStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "in"
  | "out";

export interface VisitLog {
  checkInTime?: string;
  checkOutTime?: string;
}

/* ---------- VISITORS ---------- */

export interface InformalVisitor {
  name: string;
  phone: string;
  email?: string;
  relation: string;
  photo: string;
}

export interface ProfessionalVisitor {
  name: string;
  phone: string;
  email?: string;
  photo: string;
}

/* ---------- BASE ---------- */

interface BaseVisit {
  id: string;
  purpose: string;
  hostId: string;
  guardId: string;

  status: VisitStatus;
  log: VisitLog;
}

/* ---------- TYPES ---------- */

export interface InformalVisit extends BaseVisit {
  visitType: "informal";
  visitors: InformalVisitor[];
}

export interface ProfessionalVisit extends BaseVisit {
  visitType: "professional";
  visitors: ProfessionalVisitor[];

  companyName: string;
  designation: string;
}

export type VisitRequest = InformalVisit | ProfessionalVisit;