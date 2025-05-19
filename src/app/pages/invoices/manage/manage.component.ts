import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  invoice: Invoice;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.invoice = { id: 0, invoice_number: '', invoice_date: '', total_amount: 0 };
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.invoice.id = this.activateRoute.snapshot.params.id;
      this.getInvoice(this.invoice.id);
    }
  }

  getInvoice(id: number) {
    this.invoiceService.view(id).subscribe({
      next: (invoice) => {
        this.invoice = invoice;
        console.log('Invoice fetched successfully:', this.invoice);
      },
      error: (error) => {
        console.error('Error fetching invoice:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      invoice_number: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      invoice_date: ['', [Validators.required]],
      total_amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/invoices/list']);
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.invoiceService.create(this.invoice).subscribe({
      next: (invoice) => {
        console.log('Invoice created successfully:', invoice);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro de factura creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/invoices/list']);
      },
      error: (error) => {
        console.error('Error creating invoice:', error);
      }
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.invoiceService.update(this.invoice).subscribe({
      next: (invoice) => {
        console.log('Invoice updated successfully:', invoice);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro de factura actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/invoices/list']);
      },
      error: (error) => {
        console.error('Error updating invoice:', error);
      }
    });
  }
}
