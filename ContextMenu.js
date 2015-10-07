function ContextMenu(event)
{
	/**
	* Attributes
	*/
	this.iconVide = 'icon_vide.png';
	this.iconDeroule = 'icon_deroule.png';
	this.blocMenu = document.createElement('div');
	this.blocMenu.setAttribute('id', 'ContextMenuID');

	/**
	* Close menu when we click out of context menu
	*/
	var boolClose = true;
	this.blocMenu.onclick = function()
	{
		boolClose = false;
	}
	
	window.onclick = function(event) {
		if(boolClose)
			CloseContextMenu();
		else
			boolClose = true;
	}
	
	/**
	* Display menu
	*/
	this.blocMenu.style.top = event.clientY+'px';
	this.blocMenu.style.left = event.clientX+'px';
	document.body.appendChild(this.blocMenu);
}

ContextMenu.prototype = {

	AddMenu : function(name, callback, icon)
	{
		if(callback == null)
			callback = 'return false';

		if(icon == null)
			icon = this.iconVide;
		
		var menu = document.createElement('a');
		menu.setAttribute('id', 'menu-'+name);
		menu.setAttribute('href', '#');
		menu.setAttribute('onclick', callback);
				
		var BlocIcon = document.createElement('img');
		BlocIcon.setAttribute('src', icon);
		BlocIcon.setAttribute('alt', 'Icon');
		BlocIcon.setAttribute('width', 20);
		BlocIcon.setAttribute('height', 20);
		menu.appendChild(BlocIcon);
		menu.innerHTML += name;
		
		this.blocMenu.appendChild(menu);
	},
	
	AddMenuItem : function(NameMenu, name, callback, icon)
	{
		if(callback == null)
			callback = 'return false';

		if(icon == null)
			icon = this.iconVide;
		
		var Menu = document.getElementById('menu-'+NameMenu);
		var BlocMenu = document.createElement('div');
		BlocMenu.setAttribute('id', 'BlocMenu-'+NameMenu);
		if(!document.getElementById('BlocMenu-'+NameMenu)) {
			Menu.appendChild(BlocMenu);		
			var img = document.createElement('img');
			img.src = this.iconDeroule;
			Menu.appendChild(img);
		}
		else
			BlocMenu = document.getElementById('BlocMenu-'+NameMenu);
		
		var menuitem = document.createElement('a');
		menuitem.setAttribute('id', 'menu-'+NameMenu+'-'+name);
		menuitem.setAttribute('href', '#');
		menuitem.setAttribute('onclick', callback);
			
		var BlocIcon = document.createElement('img');
		BlocIcon.setAttribute('src', icon);
		BlocIcon.setAttribute('alt', 'Icon');
		BlocIcon.setAttribute('width', 20);
		BlocIcon.setAttribute('height', 20);
		menuitem.appendChild(BlocIcon);
		menuitem.innerHTML += name;
		BlocMenu.appendChild(menuitem);
		
		Menu.onmouseover = function()
		{
			BlocMenu.style.display = 'block';
		}
		Menu.onmouseout = function()
		{
			BlocMenu.style.display = 'none';
		}
	},
	
	Show : function(event)
	{	
		if((parseInt(this.blocMenu.offsetHeight)+parseInt(this.blocMenu.offsetTop)) > parseInt(document.documentElement.clientHeight)) {
			this.blocMenu.style.top = (parseInt(document.documentElement.clientHeight) - parseInt(this.blocMenu.offsetHeight + 10))+'px';
		}
			
		if((parseInt(this.blocMenu.offsetWidth)+parseInt(this.blocMenu.offsetLeft)) > parseInt(document.documentElement.clientWidth)) {
			this.blocMenu.style.left = (parseInt(document.documentElement.clientWidth) - parseInt(this.blocMenu.offsetWidth + 160))+'px';
		}
	}
}

function CloseContextMenu(id)
{
	if(document.getElementById('ContextMenuID'))
		document.body.removeChild(document.getElementById('ContextMenuID'));
}