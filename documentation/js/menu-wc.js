'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">simple-crm documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-baae9017181bfaf5fa77008352e4359ef5d01bf2752b9cd830829afe93bb62209f439280fd3c3a6fe6de9ec284842618f6004f3ffe8116f99a5c13b5001ed93f"' : 'data-target="#xs-components-links-module-AppModule-baae9017181bfaf5fa77008352e4359ef5d01bf2752b9cd830829afe93bb62209f439280fd3c3a6fe6de9ec284842618f6004f3ffe8116f99a5c13b5001ed93f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-baae9017181bfaf5fa77008352e4359ef5d01bf2752b9cd830829afe93bb62209f439280fd3c3a6fe6de9ec284842618f6004f3ffe8116f99a5c13b5001ed93f"' :
                                            'id="xs-components-links-module-AppModule-baae9017181bfaf5fa77008352e4359ef5d01bf2752b9cd830829afe93bb62209f439280fd3c3a6fe6de9ec284842618f6004f3ffe8116f99a5c13b5001ed93f"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataProtectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataProtectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogAddOrganisationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogAddOrganisationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogAddUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogAddUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditAddressComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditAddressComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditOrganisationAdminsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditOrganisationAdminsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditOrganisationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditOrganisationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditOrganisationTodosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditOrganisationTodosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditOrganisationUsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditOrganisationUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogEditUserTodosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogEditUserTodosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImprintComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImprintComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganisationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganisationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganisationDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganisationDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrusticonsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrusticonsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Organisation.html" data-type="entity-link" >Organisation</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});