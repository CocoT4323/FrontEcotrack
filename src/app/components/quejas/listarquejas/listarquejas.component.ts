import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Quejas } from '../../../models/Quejas';
import { QuejasService } from '../../../services/quejas.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarquejas',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule, CommonModule, RouterLink],
  templateUrl: './listarquejas.component.html',
  styleUrl: './listarquejas.component.css'
})
export class ListarquejasComponent implements OnInit{
  dataSource: MatTableDataSource<Quejas> = new MatTableDataSource();
  totalItems: number = 0;//Manejar la cantidad
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'accion01',
    'accion02',
  ];

  constructor(private qS: QuejasService,
    private snackBar: MatSnackBar
  ) {}
  @ViewChild(MatPaginator) paginator!:MatPaginator;//agredo
  ngOnInit(): void {
    this.qS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      if (this.dataSource.data.length === 0) {
        this.mostrarMensajeSinDatos();
      }
    });
    this.qS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  mostrarMensajeSinDatos() {
    this.snackBar.open('No hay datos agregados...', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  eliminar(id: number) {
    this.qS.delete(id).subscribe((data) => {
      this.qS.list().subscribe((data) => {
        this.qS.setList(data);
      });
    });
  }
}
