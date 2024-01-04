import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PROJECTS_IN_TEAM } from '../queries/get-projects-in-team';
import { IProjectInTeam } from '../models/project-in-team';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private readonly apollo: Apollo) {}

  getProjectsInTeam(teamId: string) {
    return this.apollo.query<{ getProjectsForTeam: IProjectInTeam[] }>({
      query: GET_PROJECTS_IN_TEAM,
      variables: { teamId },
      fetchPolicy: 'network-only',
    });
  }
}
