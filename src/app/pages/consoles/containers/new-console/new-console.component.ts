import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ConsoleModels } from '../../enums/consoleModels.enum';
import { ConsolesService } from '../../services/consoles.service';
import { Console } from '../../models/console.model';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SelectItem } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-new-console',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    RouterModule
  ],
  templateUrl: './new-console.component.html',
  styleUrls: ['./new-console.component.scss']
})
export class NewConsoleComponent implements OnInit {

  editMode: boolean = false;
  consoleToEdit: Console = {} as Console;

  form: FormGroup = this.fb.group({
    name: [ '', Validators.required ],
    model: [ ConsoleModels.PS4, Validators.required ],
    games: [ '' ]
  });

  consoleModelOptions: SelectItem[] = [];

  gameOptions: SelectItem[] = [
    { label: 'Fifa 22', value: 'Fifa22' },
    { label: 'Pes 22', value: 'Pes22' },
    { label: 'Nba 22', value: 'Nba22' }
  ];
  selectedGames: string[] = [];

  constructor(
    private fb: FormBuilder,
    private consolesService: ConsolesService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    for (const [k, v] of Object.entries(ConsoleModels)) {
      this.consoleModelOptions.push({ label: v, value: v });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        if (params['id']) {
          this.consolesService.getSingleConsole(params['id']).subscribe({
            next: res => {
              this.editMode = true;

              if (res.games) {
                this.selectedGames = res.games.split(',');
              }

              this.form.patchValue({ ...res });
              this.consoleToEdit = res;
            },
            error: error => {
              console.log(error);
            }
          });
        }
      }
    });
  }

  handleSubmit(): void {
    this.form.patchValue({ games: this.selectedGames.toString() });

    if (this.editMode) {
      this.consolesService.editConsole(this.form.value, this.consoleToEdit._id).subscribe({
        next: () => {
          this.router.navigate(['/consoles']).then();
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      this.consolesService.addNewConsole(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/consoles']).then();
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/consoles']).then();
  }

}
