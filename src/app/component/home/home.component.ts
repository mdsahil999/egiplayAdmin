import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
declare var $: any;
export interface Tournament {
  Organizer: string;
  caster: string;
  created_at: string;
  description: string;
  display_to_user: boolean;
  end_date: string;
  game_type: string;
  id: number;
  image: string;
  is_active: boolean;
  locked: boolean;
  name: string;
  prize_pool: number;
  start_date: string;
  total_squads: number;
  venue: string;
}
export interface TournamentTeams {
  squad_id: number;
  squad_name: string;
  team_id: number;
  team_name: string;
  game_type_id: number;
  squads_playing_flag: number;
  tournament_teams_id: number;
}
export interface IPlace {
  id: number;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  chartArr: any;
  templateTypeSelected: any = "";
  isTournamentDisable = true;
  tournamentTeams: TournamentTeams[] = [];
  selectedTournamentTeams: TournamentTeams[] = [];
  tournaments: Tournament[] = [];
  selectedTournament!: Tournament;
  panelOpenState = true;
  sampleData: any[] = [];
  playerDetails: any;
  websites: any[] = [
    { value: '1', viewValue: 'ItSolutionStuff.com' },
    { value: '2', viewValue: 'HDTuto.com' },
    { value: '3', viewValue: 'Nicesnippets.com' },
  ];
  public dropdownList: any[] = [];
  public selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(
    private _router: Router,
    private api: ApiService,
    private common: CommonService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if(sessionStorage.getItem("game_type")){
    this.templateTypeSelected = sessionStorage.getItem("game_type");
    } else{
      this.templateTypeSelected = "PUBG";
    }
    sessionStorage.setItem("game_type", this.templateTypeSelected);
    this.sampleData = [
      {
        id: 101,
        name: '4 Unknown',
        game_type__name: 'Freefire',
        team__name: '4 Unknown',
        team__id: 64,
        players: [
          {
            id: 862,
            name: 'KUNAL KUMAR',
            profile_pic: '',
            ign: 'KUNAL JR',
          },
          {
            id: 919,
            name: 'Deadsoul',
            profile_pic: '',
            ign: 'Deadsoul',
          },
          {
            id: 1040,
            name: 'Swastik Madhukar Dushing',
            profile_pic: '',
            ign: 'SWASTIK',
          },
          {
            id: 1041,
            name: 'Anil Vadher',
            profile_pic: '',
            ign: 'WIZARDO',
          },
          {
            id: 1042,
            name: 'Anand Madhukar Dushing',
            profile_pic: '',
            ign: 'ANAND',
          },
        ],
      },
      {
        id: 101,
        name: '4 Unknown 23',
        game_type__name: 'Freefire',
        team__name: '4 Unknown',
        team__id: 64,
        players: [
          {
            id: 862,
            name: 'KUNAL KUMAR',
            profile_pic: '',
            ign: 'KUNAL JR',
          },
          {
            id: 919,
            name: 'Deadsoul',
            profile_pic: '',
            ign: 'Deadsoul',
          },
          {
            id: 1040,
            name: 'Swastik Madhukar Dushing',
            profile_pic: '',
            ign: 'SWASTIK',
          },
          {
            id: 1041,
            name: 'Anil Vadher',
            profile_pic: '',
            ign: 'WIZARDO',
          },
          {
            id: 1042,
            name: 'Anand Madhukar Dushing',
            profile_pic: '',
            ign: 'ANAND',
          },
        ],
      },
    ];
    this.playerDetails = {
      id: 973,
      name: '"Amit Singh Tanwar "',
      profile_pic: null,
      profile_pic_without_bg: null,
      birth_date: null,
      age: null,
      ign: '"Amit Singh Tanwar "',
      approximate_income: null,
      height: null,
      relationship_status: 'single',
      role: 'Owner',
      platform: null,
      description: '',
      city: null,
      location: null,
      country: 105,
      is_content_creator: false,
      is_former_player: false,
      is_manager: false,
      is_coach: false,
      is_owner: true,
      total_matches_recorded: 0,
      total_under_top_10: 0,
      total_under_top_5: 0,
      total_under_top_3: 0,
      upvote_score: 1,
      downvote_score: 0,
      youtube_handle_type: null,
      youtube_handle: null,
      instagram_handle: null,
      facebook_handle: null,
      youtube_subscriber_count: null,
      youtube_subscriber_update_date: null,
      instagram_followers_count: null,
      instagram_followers_update_date: null,
      active_since: '2022-04-03',
      is_active: true,
      comment: '',
      country_info: {
        id: 105,
        name: 'India',
        alpha_2: 'IN',
        alpha_3: 'IND',
        is_active: true,
      },
      squad_data: [],
    };

    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'team_id',
    //   textField: 'team_name',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   //itemsShowLimit: 3,
    //   allowSearchFilter: true,
    // };

    this.getTournaments();
    this.getImageValue();
  }

  getImageValue() {
    this.chartArr = [
      {
        name: 'PUBG',
        url: '/assets/images/icons/pubg',
      },
      {
        name: 'CSGO',
        url: '/assets/images/icons/csgo',
      },
      {
        name: 'FREEFIRE',
        url: '/assets/images/icons/cod',
      },
      {
        name: 'VALORANT',
        url: '/assets/images/icons/last',
      },
    ];
  }
  getSrc(url: string, template: any){
    if(this.templateTypeSelected == template){
      return url + '_white.png'
    }
    return url  + '.png'
  }
  getDataByTemplate(val: any, i: any) {
    this.templateTypeSelected = val.name;
    sessionStorage.setItem("game_type", this.templateTypeSelected);
    window.location.reload();
    //for future implmentations
  }

  getClassName(src: string): any {
    if (
      src == '/assets/images/icons/cod' ||
      src == '/assets/images/icons/cod_white'
    ) {
      return 'codImg';
    } else if (
      src == '/assets/images/icons/csgo' ||
      src == '/assets/images/icons/csgo_white'
    ) {
      return 'csgoImg';
    } else if (
      src == '/assets/images/icons/pubg' ||
      src == '/assets/images/icons/pubg_white'
    ) {
      return 'pubgImg';
    } else if (
      src == '/assets/images/icons/last' ||
      src == '/assets/images/icons/last_white'
    ) {
      return 'lastImg';
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  panelOpen(value: string): void {
    console.log('value', value);
  }

  public createMatch(): void {
    this._router.navigate(['/match']);
  }

  public onRowSelect(event: any): void {
    this.selectedTournament = event.data;
    sessionStorage.setItem("selectedTournament", JSON.stringify(this.selectedTournament));
    this.getTournamentTeams();
    console.log('onRowSelect', event);
  }

  public onRowUnselect(event: any): void {
    this.selectedTournament = event.data;
    sessionStorage.setItem("selectedTournament", JSON.stringify(this.selectedTournament));
    this.getTournamentTeams();
    console.log('onRowUnselect', event);
  }

  public getTournaments() {
    const url = `${this.api.get_tournaments}?game_type=PUBG&offset=0&limit=10`;
    this.common.getServiceWithoutAuth(url).subscribe(
      (res: any) => {
        if(res['success']){
        this.tournaments = res['data'];

        if(sessionStorage.getItem("selectedTournament")){
          const obj = sessionStorage.getItem("selectedTournament") as string;
          const parseObj = JSON.parse(obj);
          this.selectedTournament = parseObj;
        } else{
          this.selectedTournament = this.tournaments[0];
          sessionStorage.setItem("selectedTournament", JSON.stringify(this.selectedTournament));
        }


        this.getTournamentTeams();
      }
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: res['message']});
        }
      },
      (err) => {
        //this.loader = false;
      }
    );
  }

  public getTournamentTeams() {
    const url = `${
      this.api.get_tournaments_teams
    }?game_type=PUBG&tournament_id=${
      (this.selectedTournament as Tournament)?.id
    }`;
    this.common.getServiceWithoutAuth(url).subscribe(
      (res: any) => {
        if(res['success']){
        this.tournamentTeams = res['data'];
        this.selectedTournamentTeams = this.tournamentTeams.filter(e => e.squads_playing_flag == 1);
        }
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: res['message']});
        }
        console.log('this.tournamentteams', this.tournamentTeams);
      },
      (err) => {
        //this.loader = false;
      }
    );
  }
  public save(): void{
    const url = this.api.create_tournaments_teams;
    const selectedTeams = this.selectedTournamentTeams.map(e =>{
      return [e.team_id, e.squad_id, e.tournament_teams_id];
    }
    );
    var data = {
      "tournament_id":this.selectedTournament?.id,
      "game_type":"PUBG",
      "teams":selectedTeams
  };
  console.log("data", data);
    this.common.postWitoutAuthService(data, url).subscribe(
      (res: any) => {
        if(res['success']){
        this.isTournamentDisable = true;
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Saved Successfully'});
      } else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong'});
      }
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong'});
      }
    )
  }

  addTournament(){
    window.open(this.api.add_tournament);
  }
  editTournament(id: any){
    const replacements = {
      tournamentId: id,
    };
    const url = this.getDynamicUrl(this.api.edit_tournament, replacements)
    window.open(url);
  }

  getDynamicUrl(url:any, replacements: any){
    return url.replace(/#([^#]+)#/g, (match: any, key: any) => {
      // If there's a replacement for the key, return that replacement with a `<br />`. Otherwise, return a empty string.
      return replacements[key] !== undefined
        ? replacements[key]
        : "";
    });
  }
}
