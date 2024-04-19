import React from 'react';

function NavbarItem({render, role, ...props}){
  var atual = true;

  if (render && role) {

    if (props.href == window.location.href.substring(window.location.href.lastIndexOf("#"))  ){
      atual = true;
    } else {
      atual = false;
    }
        return (

        <li className={atual ?  'nav-item active': `nav-item`}>
          <a  onClick = {props.onClick} className="nav-link" href={props.href}  >{props.label}</a>
        </li>
        )
        
  } else {
    return false;
  }
}

export default NavbarItem;