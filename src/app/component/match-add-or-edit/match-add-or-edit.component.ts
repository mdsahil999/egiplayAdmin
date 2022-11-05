import { Component, OnInit, resolveForwardRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  SelectItemGroup,
} from 'primeng/api';
import { concat, from, groupBy, merge, mergeMap, of, toArray, zip } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { Tournament } from '../home/home.component';
declare var $: any;
export interface Match {
  id: number;
  name: string;
  start_date: string;
  map_name: string;
  match_type: string;
  venue: string;
}
@Component({
  selector: 'app-match-add-or-edit',
  templateUrl: './match-add-or-edit.component.html',
  styleUrls: ['./match-add-or-edit.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MatchAddOrEditComponent implements OnInit {
  //@ViewChild('dynamicForm', {static: false}) dynamicForm: DynamicFormComponent | undefined;
  isTournamentDisable = true;
  newselectedCountriesGroupBy: any;
  display: boolean = false;
  dialogMessage = '';
  products: any[] = [];
  cols: any[] = [];
  killForm!: FormGroup;
  profileSubmitted = false;
  gender: any;
  public value: Date = new Date();
  tournaments: Tournament[] = [];
  selectedTournament!: Tournament;
  public matches: Match[] = [];
  public selectedMatch!: Match;
  public selectedCountries: any[] = [];
  public groupedCities: any[] = [];
  public columnData = {
    success: true,
    message: '',
    data: {
      id: 1,
      game_type: 1,
      columns: [
        {
          name: 'kill',
          field: 'dropdown',
        },
        {
          name: 'killed',
          field: 'dropdown',
        },
        {
          name: 'weapon_type',
          field: 'textbox',
        },
        {
          name: 'test_type',
          field: 'textbox',
        },
      ],
      is_active: true,
    },
  };
  public columns: any[] = [];
  constructor(
    private _router: Router,
    private api: ApiService,
    private common: CommonService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.killForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.products = [];
    this.cols = [];
    this.getTournaments();
    //this.get_live_score_logs();
  }

  public getTournaments() {
    const url = `${this.api.get_tournaments}?game_type=PUBG&offset=0&limit=10`;
    this.common.getServiceWithoutAuth(url).subscribe(
      (res: any) => {
        debugger
        console.log('res', res['data']);
        this.tournaments = res['data'];
        if(sessionStorage.getItem("selectedTournament")){
          const obj = sessionStorage.getItem("selectedTournament") as string;
          const parseObj = JSON.parse(obj);
          this.selectedTournament = this.tournaments.find(e => e.id == parseObj.id) as Tournament;
          //this.selectedTournament = this.tournaments[1]
        } else{
          this.selectedTournament = this.tournaments[0];
        }

        console.log("this.selectedTournament subhanshu", this.selectedTournament);
        this.getTournamentsMatches(this.selectedTournament.id);
      },
      (err) => {
        //this.loader = false;
      }
    );
  }


  public getTournamentsMatches(tournamentId: number) {
    const url = `${this.api.get_tournaments_matches}?game_type=PUBG&tournament_id=${tournamentId}`;
    this.common.getServiceWithoutAuth(url).subscribe(
      (res: any) => {
        console.log('res 2', res['data']);
        //this.matches = res['data'] as any[];
        this.matches = (res['data'] as any[]).find(
          (x) => x.tournament_id == tournamentId
        ).matches;
        this.selectedMatch = this.matches[0];
        this.getMatchPlayers(tournamentId, this.selectedMatch.id);
      },
      (err) => {
        //this.loader = false;
      }
    );
  }

  public onRowSelect(event: any): void {
    this.selectedMatch = event.data;
    this.getMatchPlayers(this.selectedTournament.id, event.data.id);
  }

  public onRowUnselect(event: any): void {
    this.selectedMatch = event.data;
    this.getMatchPlayers(this.selectedTournament.id, event.data.id);
  }

  public tournamentChange(event: any): void {
    debugger
    sessionStorage.setItem("selectedTournament", JSON.stringify(event.value));
    console.log('event event', event);
    this.selectedTournament = event.value;
    this.getTournamentsMatches(this.selectedTournament.id);
  }

  public getMatchPlayers(tournamentId: number, matchId: number): void {
    this.selectedCountries = [];
    const url = `${this.api.get_match_players}?game_type=PUBG&tournament_id=${tournamentId}&match_id=${matchId}`;
    this.common.getServiceWithoutAuth(url).subscribe(
      (res: any) => {
        debugger
        console.log('res 2 lollol', res['data']);
        this.groupedCities = (res['data'] as any[]).map((data) => {
          return {
            label: data.squad_name+' - '+ data.team_name,
            value: [data.squad_id, data.team_id].join(','),
            items: (data.player as any[]).map((e) => {
              return {
                label: e.player_name,
                player_playing_flag: e.player_playing_flag,
                value: {
                  squad_name: data.squad_name,
                  team_name: data.team_name,
                  squad_id: data.squad_id,
                  team_id: data.team_id,
                  players: e,
                },
              };
            }),
          };
        });
        console.log('log log', this.groupedCities);
        const selectedCountriesGroup = this.groupedCities.map((e) => {
          return (e.items as any[]).map((a) => {
            return a.value;
          });
        });
        selectedCountriesGroup.forEach((e) => {
          (e as any[]).forEach((a) => {
            if (a.players.player_playing_flag === 1) {
              this.selectedCountries.push(a);
            }
          });
        });
        console.log(' this.groupedCities sahil', this.groupedCities);
        console.log(' this.selectedCountries sahil', this.selectedCountries);
        this.get_live_score_logs();
      },
      (err) => {
        //this.loader = false;
      }
    );
  }

  public save(): void {
    //this.showDialog();
        console.log('newselectedCountriesGroupBy',  this.newselectedCountriesGroupBy);
        const url = this.api.create_match_players;
        const data = {
          tournament_id: this.selectedTournament.id.toString(),
          match_id: this.selectedMatch.id.toString(),
          game_type: 'PUBG',
          teams:  this.newselectedCountriesGroupBy,
        };

        this.common.postWitoutAuthService(data, url).subscribe(
          (res: any) => {
            if (res['success']) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Data Saved Successfully',
              });
              this.display = false;
              this.isTournamentDisable = true;
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res['message'],
              });
            }
          }
          // (res: any) => {
          //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Saved Successfully'});
          // },
          // (err) => {
          //   this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong'});
          // }
        );
  }

  public getTeamNameByTeamId(id: number) {}

  public addKill(): void {
    this.getColumn();
    $('#profile').modal('show');
  }

  public profileSubmit(): void {
    this.profileSubmitted = true;
    console.log('data', this.killForm);
  }

  public getValidation(controlName: any) {
    return `${this.f}.${controlName}.errors.required`;
  }

  get f() {
    return this.killForm.controls;
  }

  public setStatus() {
    const url = this.api.set_match_status;
    const data = {
      tournament_id: this.selectedTournament.id.toString(),
      match_id: this.selectedMatch.id.toString(),
      game_type: 'PUBG',
      start_flag: 'true',
    };

    this.common.postWitoutAuthService(data, url).subscribe(
      (res: any) => {
        if (res['success']) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status Changed Successfully',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res['message'],
          });
        }
      }
      // (res: any) => {
      //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Saved Successfully'});
      // },
      // (err) => {
      //   this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong'});
      // }
    );
  }


  public getColumn() {
    const url = this.api.get_columns;
    const data = {
      tournament_id: this.selectedTournament.id.toString(),
      match_id: this.selectedMatch.id.toString(),
      game_type: 'PUBG',
    };

    this.common.postWitoutAuthService(data, url).subscribe(async (res: any) => {
      if (res['success']) {
        this.columns = res['data'].columns;
        const promiseDart = this.columns.map(async (e) => {
          return {
            ...e,
            option: await this.getOptionvalue(e.name),
          };
        });
        this.columns =  await Promise.all(promiseDart).then(allResults => {
          return allResults;
      })
      console.log("promiseDart", promiseDart);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res['message'],
        });
      }
    });
  }


  public saveKill(dataValue: any) {
    console.log('data', dataValue);
    const url = this.api.update_live_scores;
    const data = {
      tournament_id: this.selectedTournament.id.toString(),
      match_id: this.selectedMatch.id.toString(),
      game_type: 'PUBG',
      score: dataValue
    };

    this.common.postWitoutAuthService(data, url).subscribe(
      (res: any) => {
        if (res['success']) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status Changed Successfully',
          });
          this.get_live_score_logs();
          $('#profile').modal('hide');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res['message'],
          });
          $('#profile').modal('hide');
        }
      }
    );
  }

  public async getOptionvalue(key: any): Promise<any> {
    return new Promise((resolve, reject)=>{
   // return "khi";
    let returnValue = "";
    const url = this.api.get_columns_data;

    const data = {
      tournament_id: this.selectedTournament.id.toString(),
      match_id: this.selectedMatch.id.toString(),
      game_type: 'PUBG',
      key: key,
    };

    this.common.postWitoutAuthService(data, url).subscribe((res: any) => {
      if (res['success']) {
        returnValue = res['data'];
        resolve(returnValue)
        //return returnValue;
      } else {
        returnValue = "";
        resolve(returnValue)
        //return returnValue;
      }
    });
  })
  }

  public setKillForm() {
    this.killForm.reset();
    this.killForm = new FormGroup(
      this.columns.reduce((memo, fieldDesc) => {
        return {
          ...memo,
          [fieldDesc.name]: new FormControl('', Validators.required),
        };
      }, {})
    );
    console.log('this.killForm', this.killForm);
  }

  public get_live_score_logs(){
    debugger
    const url = this.api.get_live_score_logs;

    const data = {
      tournament_id: this.selectedTournament.id.toString(),
      match_id: this.selectedMatch.id.toString(),
      game_type: 'PUBG',
    };

    this.common.postWitoutAuthService(data, url).subscribe((res: any) => {
      if (res['success']) {
       console.log("res['data']", res['data']);
        const data = res['data'];
       this.cols = data.columns;
        this.products = data.data;
      } else {

      }
    });
  }
  public closePopup(){
    $('#profile').modal('hide');
  }

  showDialog() {
debugger
    console.log('selectedMatchselectedMatch', this.selectedCountries);
    const selectedCountriesGroupBy: any[] = [];
    const people = this.selectedCountries;
    this.dialogMessage =
      this.selectedCountries
        .map((e) => {
          return e.players.player_name;
        })
        .join(',') + ' seleted';
    from(people)
      .pipe(
        groupBy(
          (person) =>
            [(person as any).squad_id, (person as any).team_id, (person as any).team_name , (person as any).squad_name].join(','),
          (p) => (p as any).players
        ),
        mergeMap((group) =>
          zip(of((group as any).key), (group as any).pipe(toArray()))
        )
      )
      .subscribe((e) => {
        selectedCountriesGroupBy.push(e);
      });

    this.newselectedCountriesGroupBy = selectedCountriesGroupBy.map((e) => {
      const spiltData = e[0].split(',');
      return {
        squad_id: +spiltData[0],
        team_id: +spiltData[1],
        team_name: spiltData[2],
        squad_name: spiltData[3],
        players: e[1],
      };
    });
console.log("this.newselectedCountriesGroupBy", this.newselectedCountriesGroupBy);

    this.display = true;
}

getDynamicUrl(url:any, replacements: any){
  return url.replace(/#([^#]+)#/g, (match: any, key: any) => {
    // If there's a replacement for the key, return that replacement with a `<br />`. Otherwise, return a empty string.
    return replacements[key] !== undefined
      ? replacements[key]
      : "";
  });
}

editMatch(id: any){
  const replacements = {
    edit_match: id,
  };
  const url = this.getDynamicUrl(this.api.edit_match, replacements)
  window.open(url);
}
}
