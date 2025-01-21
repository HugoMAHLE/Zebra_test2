export interface Visitor {
  id: number;        // Unique identifier for each visitor (adjust based on your DB model)
  firstname: string; // First name of the visitor
  lastname: string;  // Last name of the visitor
  email: string;     // Visitor's email address
  phone: string;     // Visitor's phone number
  company: string;   // Company the visitor is associated with
  isSelected?: boolean; // Track if the visitor is selected (optional for checkbox)
}
