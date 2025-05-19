import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaintenanceProcedure } from "src/app/models/maintenance-procedure.model";
import { MaintenanceProcedureService } from "src/app/services/maintenance-procedure.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  maintenanceProcedure: MaintenanceProcedure;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private maintenanceProcedureService: MaintenanceProcedureService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.maintenanceProcedure = {
      id: 0,
      procedure_id: 0,
      maintenance_id: 0,
    };
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.maintenanceProcedure.id = this.activateRoute.snapshot.params.id;
      this.getMaintenanceProcedure(this.maintenanceProcedure.id);
    }
  }

  getMaintenanceProcedure(id: number) {
    this.maintenanceProcedureService.view(id).subscribe({
      next: (maintenanceProcedure) => {
        this.maintenanceProcedure = maintenanceProcedure;
        console.log(
          "Maintenance Procedure fetched successfully:",
          this.maintenanceProcedure
        );
      },
      error: (error) => {
        console.error("Error fetching maintenance procedure:", error);
      },
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      procedure_id: [0, [Validators.required]],
      maintenance_id: [0, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(["/maintenance-procedures/list"]);
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: "Error!",
        text: "Por favor, complete todos los campos requeridos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    this.maintenanceProcedureService
      .create(this.maintenanceProcedure)
      .subscribe({
        next: (maintenanceProcedure) => {
          console.log(
            "Maintenance Procedure created successfully:",
            maintenanceProcedure
          );
          Swal.fire({
            title: "Creado!",
            text: "Procedimiento de mantenimiento creado correctamente.",
            icon: "success",
          });
          this.router.navigate(["/maintenance-procedures/list"]);
        },
        error: (error) => {
          console.error("Error creating maintenance procedure:", error);
        },
      });
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: "Error!",
        text: "Por favor, complete todos los campos requeridos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    this.maintenanceProcedureService
      .update(this.maintenanceProcedure)
      .subscribe({
        next: (maintenanceProcedure) => {
          console.log(
            "Maintenance Procedure updated successfully:",
            maintenanceProcedure
          );
          Swal.fire({
            title: "Actualizado!",
            text: "Procedimiento de mantenimiento actualizado correctamente.",
            icon: "success",
          });
          this.router.navigate(["/maintenance-procedures/list"]);
        },
        error: (error) => {
          console.error("Error updating maintenance procedure:", error);
        },
      });
  }
}
