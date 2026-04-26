"""
Generate a sample medical bill PDF for demo/testing purposes.
Uses PyMuPDF (fitz) to create a realistic-looking medical bill.
"""

import fitz  # PyMuPDF
import os

def create_bill_pdf(output_path: str, title: str, items: list, subtotal: str, ins_adj: str, total: str):
    doc = fitz.open()
    page = doc.new_page(width=612, height=792)  # Letter size

    # Colors
    header_color = (0.1, 0.3, 0.6)
    black = (0, 0, 0)
    gray = (0.4, 0.4, 0.4)

    # Header
    page.insert_text((50, 50), "MERCY GENERAL HOSPITAL", fontsize=18, fontname="helv", color=header_color)
    page.insert_text((50, 72), "Department of Patient Billing", fontsize=10, fontname="helv", color=gray)
    page.insert_text((50, 86), "1234 Medical Center Drive, Springfield, IL 62701", fontsize=9, fontname="helv", color=gray)
    page.insert_text((50, 100), "Phone: (217) 555-0142 | Fax: (217) 555-0143", fontsize=9, fontname="helv", color=gray)

    # Line
    page.draw_line((50, 115), (562, 115), color=header_color, width=2)

    # Title
    page.insert_text((200, 145), title, fontsize=14, fontname="helv", color=header_color)

    # Patient info
    y = 175
    page.insert_text((50, y), "Patient Name: Sarah Johnson", fontsize=10, fontname="helv", color=black)
    page.insert_text((350, y), "Account #: MRN-2026-4521", fontsize=10, fontname="helv", color=black)
    y += 18
    page.insert_text((50, y), "Date of Service: 03/15/2026", fontsize=10, fontname="helv", color=black)
    page.insert_text((350, y), "Statement Date: 04/01/2026", fontsize=10, fontname="helv", color=black)
    y += 18
    page.insert_text((50, y), "Provider: Dr. Michael Chen, MD", fontsize=10, fontname="helv", color=black)
    page.insert_text((350, y), "Insurance: BlueCross BlueShield PPO", fontsize=10, fontname="helv", color=black)

    # Line
    y += 25
    page.draw_line((50, y), (562, y), color=gray, width=0.5)

    # Table header
    y += 20
    page.insert_text((50, y), "Description", fontsize=9, fontname="helv", color=header_color)
    page.insert_text((280, y), "CPT Code", fontsize=9, fontname="helv", color=header_color)
    page.insert_text((370, y), "Qty", fontsize=9, fontname="helv", color=header_color)
    page.insert_text((420, y), "Unit Price", fontsize=9, fontname="helv", color=header_color)
    page.insert_text((510, y), "Amount", fontsize=9, fontname="helv", color=header_color)
    y += 5
    page.draw_line((50, y), (562, y), color=header_color, width=1)

    for desc, cpt, qty, unit, amount in items:
        y += 18
        page.insert_text((50, y), desc, fontsize=9, fontname="helv", color=black)
        page.insert_text((280, y), cpt, fontsize=9, fontname="helv", color=gray)
        page.insert_text((375, y), qty, fontsize=9, fontname="helv", color=black)
        page.insert_text((420, y), f"${unit}", fontsize=9, fontname="helv", color=black)
        page.insert_text((510, y), f"${amount}", fontsize=9, fontname="helv", color=black)

    # Subtotal section
    y += 30
    page.draw_line((400, y), (562, y), color=gray, width=0.5)
    y += 18
    page.insert_text((400, y), "Subtotal:", fontsize=10, fontname="helv", color=black)
    page.insert_text((510, y), f"${subtotal}", fontsize=10, fontname="helv", color=black)
    y += 18
    page.insert_text((400, y), "Insurance Adj:", fontsize=10, fontname="helv", color=gray)
    page.insert_text((510, y), f"-${ins_adj}", fontsize=10, fontname="helv", color=gray)
    y += 5
    page.draw_line((400, y), (562, y), color=header_color, width=1.5)
    y += 18
    page.insert_text((400, y), "Total Due:", fontsize=12, fontname="helv", color=header_color)
    page.insert_text((505, y), f"${total}", fontsize=12, fontname="helv", color=header_color)

    # Footer
    y += 50
    page.draw_line((50, y), (562, y), color=gray, width=0.5)
    y += 15
    page.insert_text((50, y), "Payment is due within 30 days. For questions, call Patient Billing at (217) 555-0142.", fontsize=8, fontname="helv", color=gray)
    y += 12
    page.insert_text((50, y), "This is a computer-generated statement. If you have already made payment, please disregard.", fontsize=7, fontname="helv", color=gray)

    doc.save(output_path)
    doc.close()
    print(f"Created: {output_path} ({os.path.getsize(output_path)} bytes)")


def create_all_demo_bills():
    # 1. MIXED BILL (The original one - some overcharges, some fine)
    mixed_items = [
        ("Emergency Department Visit, High", "99284", "1", "850.00", "850.00"),
        ("Complete Blood Count (CBC)", "85025", "1", "45.00", "45.00"),
        ("Comprehensive Metabolic Panel", "80053", "1", "78.00", "78.00"),
        ("Chest X-ray, 2 views", "71046", "1", "185.00", "185.00"),
        ("Electrocardiogram (ECG/EKG)", "93000", "1", "95.00", "95.00"),
        ("CT Abdomen and Pelvis w/ Contrast", "74177", "1", "1,250.00", "1,250.00"),
        ("Room and Board - Semi-Private", "ROOM", "2", "2,800.00", "5,600.00"),
        ("IV Setup and Supplies", "IV-SET", "1", "175.00", "175.00"),
        ("Therapeutic IV Push", "96374", "3", "125.00", "375.00"),
        ("Ibuprofen 400mg tablet", "", "4", "28.00", "112.00"),
        ("Ondansetron 4mg injection", "", "2", "85.00", "170.00"),
        ("Miscellaneous Supplies", "", "1", "342.00", "342.00"),
        ("Pharmacy Dispensing Fee", "PHARM", "1", "65.00", "65.00"),
    ]
    create_bill_pdf("demo_bill_mixed.pdf", "PATIENT BILLING STATEMENT", mixed_items, "9,342.00", "2,100.00", "7,242.00")

    # 2. SEVERE OVERCHARGE BILL (Crazy markups, lots of vague items)
    severe_items = [
        ("Emergency Department Visit, Highest", "99285", "1", "2,500.00", "2,500.00"),
        ("Complete Blood Count (CBC)", "85025", "1", "195.00", "195.00"),
        ("Chest X-ray, 2 views", "71046", "1", "650.00", "650.00"),
        ("CT Abdomen and Pelvis w/ Contrast", "74177", "1", "4,200.00", "4,200.00"),
        ("Room and Board - Private", "ROOM-P", "3", "6,500.00", "19,500.00"),
        ("General Hospital Supplies", "", "1", "1,240.00", "1,240.00"),
        ("Stat Lab Processing Fee", "", "1", "450.00", "450.00"),
        ("Acetaminophen 500mg tablet", "", "2", "35.00", "70.00"),
        ("Tissue Box & Hygiene Kit", "", "1", "125.00", "125.00"),
        ("Unspecified Facility Fee", "", "1", "3,500.00", "3,500.00"),
    ]
    create_bill_pdf("demo_bill_severe.pdf", "PATIENT BILLING STATEMENT", severe_items, "32,430.00", "5,000.00", "27,430.00")

    # 3. CLEAN/FAIR BILL (Prices match CMS closely, no vague items)
    clean_items = [
        ("Office visit, established, low", "99213", "1", "95.00", "95.00"),
        ("Basic metabolic panel", "80048", "1", "12.00", "12.00"),
        ("Venipuncture (blood draw)", "36415", "1", "4.00", "4.00"),
        ("Chest X-ray, single view", "71045", "1", "22.00", "22.00"),
        ("Electrocardiogram, 12-lead", "93000", "1", "19.00", "19.00"),
        ("Immunization admin, first vaccine", "90471", "1", "26.00", "26.00"),
        ("Tdap vaccine", "90715", "1", "29.00", "29.00"),
    ]
    create_bill_pdf("demo_bill_clean.pdf", "PATIENT BILLING STATEMENT", clean_items, "207.00", "180.00", "27.00")

if __name__ == "__main__":
    create_all_demo_bills()
