import { renderMatchDrill } from '../../components/matchDrill/renderMatchDrill.js';

export function renderAcronymDrill(items) {
  renderMatchDrill({
    mountId: 'acronym-drill',
    heading: 'Acronym Match',
    items,
    hintNoun: 'acronym',
    soundProfile: 'acronym',
  });
}

export function renderServiceDrill(items) {
  renderMatchDrill({
    mountId: 'service-drill',
    heading: 'Service Match',
    items,
    hintNoun: 'service',
    soundProfile: 'service',
  });
}
