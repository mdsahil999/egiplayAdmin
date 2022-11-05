import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( public global: GlobalService) { }

  get_tournaments = this.global.base_url + 'tournament_admin/get_tournaments'
  get_tournaments_teams = this.global.base_url + 'tournament_admin/get_tournaments_teams'
  create_tournaments_teams = this.global.base_url + 'tournament_admin/create_tournaments_teams'
  get_tournaments_matches = this.global.base_url + 'tournament_admin/get_tournaments_matches'
  get_match_players = this.global.base_url + 'tournament_admin/get_match_players'
  create_match_players = this.global.base_url + 'tournament_admin/create_match_players'

  get_columns = this.global.base_url + 'tournament_scores/get_columns'
  set_match_status = this.global.base_url + 'tournament_scores/set_match_status'
  get_columns_data = this.global.base_url + 'tournament_scores/get_columns_data'
  update_live_scores = this.global.base_url + 'tournament_scores/update_live_scores'
  get_live_score_logs = this.global.base_url + 'tournament_scores/get_live_score_logs'


  add_tournament = this.global.base_url + 'admin/tournaments/tournament/add/'
  edit_tournament = this.global.base_url + 'admin/tournaments/tournament/#tournamentId#/change/'

  edit_match = this.global.base_url + 'admin/tournaments/tournamentmatches/#matchId#/change/'


}
