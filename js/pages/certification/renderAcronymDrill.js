import { renderMatchDrill } from '../../components/matchDrill/renderMatchDrill.js';

export function renderAcronymDrill(cert) {
  renderMatchDrill({
    mountId: 'acronym-drill',
    heading: 'Acronym Match',
    items: cert.acronyms,
    hintNoun: 'acronym',
  });
}

export function renderServiceDrill(cert) {
  renderMatchDrill({
    mountId: 'service-drill',
    heading: 'Service Match',
    items: cert.services,
    hintNoun: 'service',
  });
}
