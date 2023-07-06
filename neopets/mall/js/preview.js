// preview.js
// Javascript functions relating to the preview window and preview list.

// **********************************
// ***** PREVIEW LIST FUNCTIONS *****
// **********************************

var preview_problems = false;
var zone_arr = [1,2,3,6,8,11,13,16,19,21,23,24,25,26,27,31,35,36,40,41,42,43,44,45,47,48,49,50,51,52];
var prev_src = '';
var uid = 0;
var furniture = 0;
var door = 1;
var win = 2;
var wall = 3;
var floor = 4;
var furniture_count = 0;
var cur_view = 'interior';
var cur_world = 0;


// Generate the HTML for the popup that displays the list of previewed items.
function preview_list(b_show) {
    remove_rollover(0);
    var list_table = document.getElementById('list_table');
    var list_body = list_table.getElementsByTagName('TBODY')[0];
    var rows_arr = list_body.getElementsByTagName('tr');

    if (b_show === null) {
        b_show = (document.getElementById('list_div').style.visibility == 'visible') ? false : true;
    }
    for (var i = rows_arr.length - 1; i >= 0; i--) {
        if (rows_arr[i].id != 'header_row') {
            list_body.removeChild(rows_arr[i]);
        }
    }

    if (b_show === false) {
        document.getElementById('list_div').style.visibility = 'hidden';
        document.getElementById('list_table').style.visibility = 'hidden';
    }
    else {
        var total_price = 0;
        var num_items = 0;
        var use_prev_arr = (cur_preview == 'pet') ? preview_id_arr : showroom_id_arr[cur_view];

        if (use_prev_arr.length > 0) {
            for (idx in use_prev_arr) {
                var oii = use_prev_arr[idx];
                if (oii !== undefined) {
                    var obj_data = desc_arr[oii];
                    var prev_name = obj_data.name;
                    var prev_sp = obj_data.isSuperpack;
                    if (!in_array(oii, no_preview_list_arr)) {
                        var row = document.createElement('tr');
                        var name_col = document.createElement('td');
                        var price_col = document.createElement('td');
                        //var expire_col = document.createElement('td');
                        var buy_col = document.createElement('td');
                        var rem_col = document.createElement('td');
                        name_col.innerHTML = "<a href='javascript:;' onclick='show_item_rollover("+oii+")'><b>"+obj_data.name+"</b></a>";
                        if (obj_data.discountPrice) {
                            name_col.innerHTML += "<div id='event_msg'><font color='red'><b>"+obj_data.event_msg+"</b></font></div>";
                            price_col.innerHTML = "<del style='color:red;'><span style='color:black;'>"+format_currency(obj_data.price)+"</span></del><b id='price2' style='color:red'>"+format_currency(obj_data.discountPrice)+"</b> " + NCMallClientTrans.getTranslation(163);
                            total_price += obj_data.discountPrice * 1;
                        }
                        else {
                            total_price += obj_data.price * 1;
                            price_col.innerHTML = format_currency(obj_data.price) + " " + NCMallClientTrans.getTranslation(163);
                        }
                        //expire_col.innerHTML = obj_data['duration'] ? obj_data['duration'] : NCMallClientTrans.getTranslation(200);
                        buy_col.innerHTML = "<input type='radio' class='cb_buy' name='" + oii + "_" + idx + "' value='buy'>";
                        rem_col.innerHTML = "<input type='radio' class='cb_rem' name='" + oii + "_" + idx + "' value='rem'>";
                        price_col.style.textAlign = 'center';
                        //expire_col.style.textAlign = 'center';
                        buy_col.style.textAlign = 'center';
                        rem_col.style.textAlign = 'center';
                        row.appendChild(name_col);
                        //row.appendChild(expire_col);
                        row.appendChild(price_col);
                        row.appendChild(rem_col);
                        row.appendChild(buy_col);
                        list_body.appendChild(row);
                        num_items++;
                    }
                }
            }
            var foot_row = document.createElement('tr');
            var foot_name_col = document.createElement('td');
            var foot_price_col = document.createElement('td');
            //var foot_expire_col = document.createElement('td');
            var foot_buy_col = document.createElement('td');
            var foot_rem_col = document.createElement('td');
            foot_name_col.innerHTML = NCMallClientTrans.getTranslation(520, {'num_items': num_items});
            //foot_expire_col.innerHTML = '&nbsp;';
            foot_price_col.innerHTML = format_currency(total_price) + " " + NCMallClientTrans.getTranslation(163);
            foot_buy_col.innerHTML = "<a href='javascript:;' onclick=\"check_all('.cb_buy');\">" + NCMallClientTrans.getTranslation(519) + "</a>";
            foot_rem_col.innerHTML = "<a href='javascript:;' onclick=\"check_all('.cb_rem');\">" + NCMallClientTrans.getTranslation(519) + "</a>";
            foot_price_col.style.textAlign = 'center';
            foot_buy_col.style.textAlign = 'center';
            foot_rem_col.style.textAlign = 'center';
            foot_row.appendChild(foot_name_col);
            //foot_row.appendChild(foot_expire_col);
            foot_row.appendChild(foot_price_col);
            foot_row.appendChild(foot_rem_col);
            foot_row.appendChild(foot_buy_col);
            foot_row.style.fontWeight = 'bold';
            list_body.appendChild(foot_row);
        }
        else {
            var foot_row = document.createElement('tr');
            var foot_name_col = document.createElement('td');
            foot_name_col.colSpan = '5';
            foot_name_col.style.textAlign = 'center';
            foot_name_col.innerHTML = '<br>' + NCMallClientTrans.getTranslation(219, {'try_str': try_str});
            foot_row.appendChild(foot_name_col);
            list_body.appendChild(foot_row);
        }
        document.getElementById('list_div').style.visibility = 'visible';
        document.getElementById('list_table').style.visibility = 'visible';
        //document.getElementById('list_div').onmousedown = function(event){( window.event ) ? dragStart(window.event) : dragStart(event)};
    }
}

// Adds each item in the Preview List that's checked to the user's cart.
function buy_checked() {
    buy_arr = [];
    var cb_buy = dojo.query('.cb_buy');
    cb_buy.forEach(
        function(node) {
            if (node.checked) {
                var parts = node.name.split('_');
                buy_arr[buy_arr.length] = parts[0];
            }
        }
    );
    if (buy_arr.length > 0) {
        preview_list();
        update_cart(buy_arr, 'add', false, true);
    }
}

// Removes each checked item from the preview list.
function rem_checked() {
    var remove_function = (cur_preview == 'pet')? remove_from_preview : deleteShowroomItem;
    var cb_rem = dojo.query('.cb_rem');
    cb_rem.forEach(
        function(node) {
            if (node.checked) {
                var parts = node.name.split('_');
                remove_function(parts[0]);
            }
        }
    );
    // Close and reopen the preview list, to refresh it.  There's gotta be a better way.
    preview_list();
    preview_list();
}

// Add all currently previewed items to the user's cart.
function buy_previewed() {
    buy_arr = [];
    var use_arr = (cur_preview == 'home') ? showroom_id_arr[cur_view] : preview_id_arr;
    for (var i = 0; i < use_arr.length; i++) {
        if (!in_array(use_arr[i],no_preview_list_arr)) {
            buy_arr[buy_arr.length] = use_arr[i];
        }
    }
    if (buy_arr.length) {
        update_cart(buy_arr, 'add', false, true);
    }
}


// *******************************************
// ***** ADD/REMOVE TO PREVIEW FUNCTIONS *****
// *******************************************

// When you click on the 'Try on' link, this function gets called.  In general, it just does an AJAX call to get_item_assets,
// and then passes control along to build_preview_queue.  It also handles getting superpack info.
// Although, as far as the system is concerned, a superpack is just an oii that has numerous assets in several different zones.
// When they interact with a superpack, there's two levels of translation.
// 1. We need to translate to PHP to tell it, "We want info about a superpack; send back all the info about all its children."
// 2. We need to translate to javascript to tell it, "We're adding/removing all N of these OIIs to/from the preview."
function preview_click(oii) {
    var obj_data = desc_arr[oii];

    var doSwap = swap_preview('pet')? true : false;
    // Delay preview while swapping
    if (doSwap) {
        setTimeout("preview_click(" + oii + ")", 3000);
        return;
    }
    // wearable not converted yet?
    if(obj_data.converted === false){
        item_not_converted(oii);
        return;
    }

    if (obj_data.isSuperpack) {
        tmp_arr = obj_data['packContents'];
        clear_preview();
        for (var i=0; i<tmp_arr.length; i++) no_preview_list_arr[no_preview_list_arr.length] = tmp_arr[i];
        wearing_superpack = true;
    }

    var parms = {};
    parms['pet'] = cur_pet;

    parms.oii = oii;
    parms.prev_count = preview_id_arr.length + 1;
    preview_id = oii;

    json_request_get('ajax/get_item_assets.phtml', parms, 'build_preview_queue');
}

function item_not_converted(oii){
    alert(desc_arr[oii].name + " is not yet converted!");
}

function updateShowroomArray(oii, key) {
    var index = (key === null) ? showroom_id_arr[cur_view].length : key;
    showroom_id_arr[cur_view][index] = oii;
}

// handle adding an item to the neohome showroom
function showroom_click(oii, cur_uid, sp_member) {
    var obj_data = desc_arr[oii];
    var isNeohome = obj_data.isNeohome? true : false;
    sp_member = (sp_member === null)? false : sp_member;
    var doSwap = swap_preview('home')? true : false;

    // Delay preview while swapping
    if (obj_data.isSuperpack) {
        if (doSwap) {
            setTimeout("addRoomBag(" + oii + ")", 3000);
        }
        else {
            addRoomBag(oii);
        }
        return;
    }
    else if (doSwap) {
        setTimeout("showroom_click(" + oii + ", " + cur_uid + ", " + sp_member + ")", 3000);
        return;
    }

    if (obj_data.structure && cur_view != 'exterior') {
        swapView('exterior');
    }
    if (isNeohome) {
        var use_uid = (cur_uid != null) ? cur_uid : uid++;
        IFrameObj = document.getElementById('preview_frame').contentWindow;

        if (obj_data.floor) {
            var type = floor;
            IFrameObj.loadFloor(oii);
        } else if (obj_data.wall) {
            var type = wall;
            IFrameObj.loadWall(oii);
        } else if (obj_data.door) {
            var type = door;
            IFrameObj.loadDoor(oii);
        } else if (obj_data.window) {
            var type = win;
            IFrameObj.loadWindow(oii);
        } else {
            var type = furniture;
            if ( showroom_arr[cur_view][type] && showroom_arr[cur_view][type][use_uid]) {
                var x = showroom_arr[cur_view][type][use_uid][1];
                var y = showroom_arr[cur_view][type][use_uid][2];
                var z = showroom_arr[cur_view][type][use_uid][3];
                var r = showroom_arr[cur_view][type][use_uid][4];
            } else {
                var x = (cur_view == 'interior') ? 2 : 100;
                var y = (cur_view == 'interior' ) ? 2 : 45;
                var z = obj_data.defaultz;
                var r = 1;
            }
            try {
                IFrameObj.addItem(oii, use_uid, x, y, 6, r);
            } catch (e) {}
        }
        if (showroom_arr[cur_view][type] === undefined) {
            showroom_arr[cur_view][type] = [];
        }
        // Multiple copies of these items may be loadded.
        if (type == furniture) {
            if (showroom_arr[cur_view][type][use_uid] === undefined) {
                showroom_arr[cur_view][type][use_uid] = new Array(oii, x, y, z, r);
                if (!sp_member) updateShowroomArray(oii);
                furniture_count++;
            }
        }
        // Need to replace currently previewed items for non-furniture.
        else {
            var replaced_oii = false;
            if (showroom_arr[cur_view][type][0]) {
                var old_oii = showroom_arr[cur_view][type][0][0];
            }
            showroom_arr[cur_view][type][0] = new Array(oii, 0, 0, 0, 1);
            for (key in showroom_id_arr[cur_view]) {
                if (old_oii && !sp_member && (showroom_id_arr[cur_view][key] == old_oii)) {
                    updateShowroomArray(oii, key);
                    replaced_oii = true;
                }
            }
            if (!replaced_oii && !sp_member) {
                updateShowroomArray(oii);
            }
            set_take_off(oii);
            set_try_on(old_oii);
        }
    }
}

function addRoomBag(oii) {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    IFrameObj.switchView('interior');
    var sp_data = desc_arr[oii];
    var child_oii_arr = sp_data['packContents'];
    for (key in child_oii_arr) {
        var child_oii = child_oii_arr[key];
        var child_data = desc_arr[child_oii];
        // Non-furniture items need to be removed first before applying.
        if (child_data.wall || child_data.floor || child_data.door || child_data.window) {
            try {
                var type = child_data.wall? wall : child_data.floor? floor : child_data.window? win : door;
                var rem_oii = showroom_arr[cur_view][type][0][0];
                clearNonFurnitureItem(rem_oii);
            }	catch(e) {}
        }
        showroom_click(child_oii, null, true);
    }
    updateShowroomArray(oii);
    set_take_off(oii);
}

// Take all of the current previewed oii's, figure out which ones are wearable and refetch them for a change in pet
function refetch_preview(oii) {
    var obj_data = desc_arr[oii];
    if (obj_data.isSuperpack) {
        tmp_arr = obj_data['packContents'];
        clear_preview();
        for (var i=0; i<tmp_arr.length; i++) no_preview_list_arr[no_preview_list_arr.length] = tmp_arr[i];
        wearing_superpack = true;
    }
    var parms = new Object;
    //TODO: Add species_id and color_id to the parms so that we don't have to send 'pet' and trigger a DB query
    parms['pet'] = cur_pet;
    parms.oii = oii;
    parms.prev_count = preview_id_arr.length + 1;
    parms['lang'] = lang;
    preview_id = oii;

    //json_request('ajax/get_item_assets.phtml', parms, 'build_preview_queue');
    json_request_get('ajax/get_item_assets.phtml', parms, 'build_preview_queue');
}

/*
DEPRECATED
// Builds a list of assets to add to the preview object from an array of oii's rather than just one
function build_preview_queue_arr(response_data) {
	//build_preview_queue(response_data);

	var IFrameObj = document.getElementById('preview_frame').contentWindow;
	var IFrameObjExt = document.getElementById('ext_preview_frame');
	try {
		IFrameObj.contentWindow.document.getElementById('loading_div').style.visibility = 'visible';
	} catch (e) {
		try {
			IFrameObj.contentWindow.document.getElementById('loading_div').style.visibility = 'visible';
		} catch (e) {}
	}

	render_preview();
	for( key in preview_id_arr ) {
		var oii = preview_id_arr[key];
		var try_links = dojo.query('.try_link_' + oii);
		take_off_elem(try_links, oii);
	}
}
*/

// Builds a list of assets to add to the preview object, and then add them one by one.
function build_preview_queue(response_data) {
    if (response_data.length == 0) {
        alert(NCMallClientTrans.getTranslation(1353));
        return;
    }
    var oiiData = new Array();
    var add_to_preview = new Array();
    for (var key in response_data) {
        // Set up the global relationships of object data and their assets first before adding to preview
        if (response_data[key].asset_data !== undefined) {
            var oii = key;
            add_to_preview.push(parseInt(oii));
            for (const y in response_data[key].asset_data) {
                oiiData.push({...response_data[key].asset_data[y], asset_id: y});
            }

        }
        // Set up superpack relationships
        if(response_data[key].isSuperpack){
            add_to_preview.pop();
            for(var i in response_data[key].superpack){
                add_to_preview.push(response_data[key].superpack[i]);
            }
        }
    }

    set_take_off(oii);
    add_to_preview_ODS2(oiiData);
    updateH5View(add_to_preview);

}


function add_to_preview_ODS2(assocs) {
    if (assocs.length === 0) return;
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    var IFrameObjExt = document.getElementById('ext_preview_frame');
    var oii = 0;

    // For each asset in this item:
    // - see what zone it occupies.
    // - If there is anything currently worn in that zone, add it to the list of OIIs we need to remove.
    var occupiers = [];

    for (var i in assocs) {
        oii = assocs[i].oii;
        var cur_asset_id = assocs[i].asset_id;
        var Asset = assocs[i];
        if (previewed_zones[Asset.zone]) {
            occupiers[occupiers.length] = previewed_zones[Asset.zone];
        }
    }

    // For each OII in the list we need to remove:
    // - Find all the zones that OII has assets in, and add those zones to the list of zones to clear
    var Commands = new Object;
    var len2 = previewed_zones.length;
    for (var i = 0; i < len2; i++) {
        if (previewed_zones[i]) {
            if (in_array(previewed_zones[i], occupiers)) {
                Commands[i] = 0;
            }
        }
    }

    // Add the new asset to the zone it goes into
    for (var i in assocs) {
        var cur_asset_id = assocs[i].asset_id;
        var Asset = assocs[i];
        Commands[Asset.zone] = cur_asset_id;
        if ((Asset.zone == 1 || Asset.zone == 2) && mute_status) {
            toggle_mute();
        }
    }

    // Remove the occupiers from our internal previewed items data structures
    var len3 = occupiers.length;
    for (var i = 0; i < len3; i++) {
        var remove_oii = occupiers[i];
        remove_from_preview(remove_oii);
    }
    //preview_index = preview_id_arr.length;
    preview_id_arr[preview_index++] = oii;

    // Go through the final list and for each zone in it, either tell the flash
    // to clear it (if it has no new asset to place) or tell the flash to add
    // the specified asset.  Then add to the previewed_zones array so that we
    // know which oiis are occupying which zones.
    for (var cur_zone in Commands) {
        if (Commands[cur_zone] != 0) {


            //Asset = assocs[Commands[cur_zone]];
            Asset = assocs.find(a => a.asset_id == Commands[cur_zone]);
            // this was before the Asset assoc idk why... doesnt really matter tho
            previewed_zones[cur_zone] = Asset.oii;
            //IFrameObj.CNV_AddPreviewItem(Asset);
            try {
                //alert('about to try on' + JSON.stringify(Asset));
                //debugger;
                IFrameObj.CNV_AddPreviewItem(Asset);
            } catch (e) {
                //alert("error: " + e);
            }
            if (IFrameObjExt) {
                IFrameObjExt.contentWindow.CNV_AddPreviewItem(Asset);
            }
        }
    }

    //set_take_off(oii);

}
// Adds the specified item to the preview.  The input is an OII and the
// function internally handles items with multiple assets per item.  This does
// NOT handle superpacks; this function is just for adding a particular OII's
// assets.  Superpack items themselves may or may not have assets in addition
// to the items they contain.
function add_to_preview_ODS(oii) {
    var assocs = ODS_get_asset_assoc(oii);
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    var IFrameObjExt = document.getElementById('ext_preview_frame');
    if (!assocs) {
        return;
    }

    // For each asset in this item:
    // - see what zone it occupies.
    // - If there is anything currently worn in that zone, add it to the list of OIIs we need to remove.
    var occupiers = [];

    for (var i in assocs) {
        var cur_asset_id = assocs[i];
        var Asset = ODS_get_asset(cur_asset_id);
        if (previewed_zones[Asset.zone]) {
            occupiers[occupiers.length] = previewed_zones[Asset.zone];
        }
    }

    // For each OII in the list we need to remove:
    // - Find all the zones that OII has assets in, and add those zones to the list of zones to clear
    var Commands = new Object;
    var len2 = previewed_zones.length;
    for (var i = 0; i < len2; i++) {
        if (previewed_zones[i]) {
            if (in_array(previewed_zones[i], occupiers)) {
                Commands[i] = 0;
            }
        }
    }

    // Add the new asset to the zone it goes into
    for (var i in assocs) {
        var cur_asset_id = assocs[i];
        var Asset = ODS_get_asset(cur_asset_id);
        Commands[Asset.zone] = cur_asset_id;
        if ((Asset.zone == 1 || Asset.zone == 2) && mute_status) {
            toggle_mute();
        }
    }

    // Remove the occupiers from our internal previewed items data structures
    var len3 = occupiers.length;
    for (var i = 0; i < len3; i++) {
        var remove_oii = occupiers[i];
        remove_from_preview(remove_oii);
    }
    //preview_index = preview_id_arr.length;
    preview_id_arr[preview_index++] = oii;

    // Go through the final list and for each zone in it, either tell the flash
    // to clear it (if it has no new asset to place) or tell the flash to add
    // the specified asset.  Then add to the previewed_zones array so that we
    // know which oiis are occupying which zones.
    for (var cur_zone in Commands) {
        if (Commands[cur_zone] != 0) {
            previewed_zones[cur_zone] = Asset.oii;

            Asset = ODS_get_asset(Commands[cur_zone]);
            //IFrameObj.CNV_AddPreviewItem(Asset);
            try {
                IFrameObj.CNV_AddPreviewItem(Asset);
            } catch (e) {}
            if (IFrameObjExt) {
                IFrameObjExt.contentWindow.CNV_AddPreviewItem(Asset);
            }
        }
    }

	set_take_off(oii);
}

// OR together two restrict strings
function restrict_add(base, add) {
    var out = '';
    for (var i = 0; i < base.length; i++) {
        out += base.substr(i, 1) | add.substr(i, 1);
    }
    return out;
}

function restrict_build() {
    var base = '0000000000000000000000000000000000000000000000000000';
    for (var zone in previewed_zones) {
        var cur_oii = previewed_zones[zone];
        if (cur_oii) {
            var assoc = ODS_get_asset_assoc(cur_oii);
            for (var asset_id in assoc) {
                var Asset = ODS_get_asset(asset_id);
                base = restrict_add(base, Asset.restrict);
            }
        }
    }
    if (pet_is_old_style) {
        base = '0001111111111111111111111111111111111111111000001110';
    }
    return base;
}


// Clear out all non-bio assets from the preview panes.
function clear_preview() {
    // Remove the worn items one by one
    for (var i = preview_id_arr.length; i >= 0; i--) {
        if (preview_id_arr[i] !== undefined) {
            remove_from_preview(preview_id_arr[i]);
        }
    }

    preview_index = 0;
    preview_id_arr = new Array;
    previewed_zones = new Array;

    // Simple solution: we hardcode the zone IDs of all the non-bio zones and
    // clear them specifically.  A better solution would be to track the bio
    // assets from the beginning, and only clear the specific zones that we know
    // have something in them, but that will have to wait.
    var IFrameObj = document.getElementById('preview_frame');
    var IFrameObjExt = document.getElementById('ext_preview_frame');

    for (var i = 0; i < zone_arr.length; i++) {
        zone_id = zone_arr[i];
        IFrameObj.contentWindow.CNV_RemPreviewItem(zone_id);
        if (IFrameObjExt) {
            try {
                IFrameObjExt.contentWindow.CNV_RemPreviewItem(zone_id);
            } catch(err) {}
        }
    }
}


// Remove an item from preview.  This removes it from the Flash object as well as
// removing it from our internal data structures.
function remove_from_preview(oii) {
    swap_preview('pet');
    var remove_arr = new Array(String(oii));

    // If the item is a superpack, we need to simply clear the entire preview window,
    // and then add all the superpack's children to the list of items to process.
    try {
        var superpack = ODS_get_superpack(oii);
        if (superpack) {
            wearing_superpack = false;
            no_preview_list_arr = [];
            for (var i in superpack) {
                var child_id = superpack[i];
                remove_arr[remove_arr.length] = child_id;
            }
        }
    } catch(e) {}

    var IFrameObj = document.getElementById('preview_frame');
    var IFrameObjExt = document.getElementById('ext_preview_frame');

    var len2 = remove_arr.length;
    for (var i = 0; i < len2; i++) {
        cur_oii = remove_arr[i];
        set_try_on(cur_oii);

        // this is not needed for the h5 view - was part of the swf renderer.
        for (var key in preview_id_arr) {
            if (preview_id_arr[key] == cur_oii) {
                try {
                    delete preview_id_arr[key];
                } catch(e) {}

                for (var key in previewed_zones) {
                    if (previewed_zones[key] == cur_oii) {
                        delete previewed_zones[key];
                    }
                }

                // Get the assets associated with this item and remove them from the preview.
                var assoc = ODS_get_asset_assoc(cur_oii);
                for (var j in assoc) {
                    var cur_asset_id = assoc[j];
                    var Asset = ODS_get_asset(cur_asset_id);

                    // Remove the asset from the Flash previews.
                    // For some inexplicable reason, wrapping the zone in Math.floor makes it work.
                    // I guess it needs to be an integer when it's passed to Flash?  Bizarre.
                    try {
                        IFrameObj.contentWindow.CNV_RemPreviewItem(Math.floor(Asset.zone));
                    } catch (e) {}

                    // Remove the item from the big floating Flash preview. TODO: Fix this, it doesn't work.
                    try {
                        IFrameObjExt.contentWindow.CNV_RemPreviewItem(Math.floor(Asset.zone));
                    } catch(e) {}
                }
            }
        }
    }
    //updateH5View(remove_arr, true);
}

// Load a pet into the preview window.  This fetches pet data and feeds it to the Flash app.
function load_pet(pet_name){
    cur_pet = pet_name;
    pet_render_complete = false;
    previews_rendered = false;
    preview_problems = false;
    preview_index = 0;
    ODS_ObjectAssets = [];

    var IFrameObj = document.getElementById('preview_frame');
    var IFrameObjExt = document.getElementById('ext_preview_frame');

    try{
        IFrameObj.contentWindow.customNeopetView_loadNeopet(pet_name);
        preview_cleared = false;
        get_pet_is_old(pet_name);
        IFrameObj.contentWindow.document.getElementById('loading_div').style.visibility = 'visible';
    }catch(err){alert('Pet loading error!')}
    try{
        IFrameObjExt.contentWindow.customNeopetView_loadNeopet(pet_name);
        IFrameObjExt.contentWindow.document.getElementById('loading_div').style.visibility = 'visible';
    }catch(err){}

    // Cleanse the previewed item list each time we load a pet.
    var reset_preview_id_arr = new Array;
    for (var i in preview_id_arr)
    {
        if (typeof(preview_id_arr[i]) != 'undefined') reset_preview_id_arr[reset_preview_id_arr.length] = preview_id_arr[i];
    }
    preview_id_arr = reset_preview_id_arr;
    if (preview_id_arr.length > 0)
    {
        // Set this up on a delay so that the app has time to initialize.
        setTimeout("json_request_get('ajax/get_item_assets.phtml', " + "{ pet: '" + cur_pet + "', oii_arr: '" + preview_id_arr.join(',') + "' }, 'build_preview_queue')", 1000);
    }
}

function get_pet_is_old(pet_name) {
    var parms = new Object;
    parms.pet = pet_name;
    json_request("ajax/pet_is_old.phtml", parms, "cb_pet_is_old");
}

function cb_pet_is_old(response_arr) {
    if (response_arr.old == "1") {
        pet_is_old_style = true;
    }
    else {
        pet_is_old_style = false;
    }

    // Show or hide the 'Your pet is old-style!' warning block accordingly.
    var osw = document.getElementById('old_style_warning');
    if (pet_is_old_style) {
        osw.style.display = 'block';
    }
    else {
        osw.style.display = 'none';
    }
}


// ******************************************
// ***** TRY ON/TAKE OFF LINK FUNCTIONS *****
// ******************************************

// Given a Dojo nodeList of try_link anchor nodes, change them so that they're valid "Take off" links.
function take_off_elem(try_links, oii, is_neohome) {
    // Fix for new shop layout (lists instead of tables). Much simpler
    if ( !try_links.length ) {
        var tryLink = $('a.try[oii=' + oii + ']');
        tryLink.find('span:visible').addClass('last').hide();
        tryLink.find('span.take-off').show();
        return;
    }

    var obj_data = desc_arr[oii];
    try_links.forEach(
        function(try_link) {
            try_link.href = "javascript:;";
            try_link.style.color = 'red';
            try_link.oii = oii;
            var subImages = dojo.query('img',try_link);
            var hasImages = (subImages.length > 0);
            if (obj_data.isNeohome) {
                try_link.onclick = function() { deleteShowroomItem(this.oii); }
                if (hasImages) {
                    subImages[0].alt = NCMallClientTrans.getTranslation(661);
                    subImages[0].title = subImages[0].alt;
                    subImages[0].src = subImages[0].src.replace('try-on','take-off');
                    try_link.onmouseover = HTMLUtilities.mouseOverFragment(subImages[0].src.replace('.png','_ov.png'),subImages[0].id);
                    try_link.onmouseout = HTMLUtilities.mouseOverFragment(subImages[0].src,subImages[0].id);
                } else {
                    try_link.innerHTML = NCMallClientTrans.getTranslation(661);
                }
            }	else {
                try_link.onclick = function() { remove_from_preview(this.oii); }
                if (hasImages) {
                    subImages[0].alt = NCMallClientTrans.getTranslation(213);
                    subImages[0].title = subImages[0].alt;
                    subImages[0].src = subImages[0].src.replace('try-on','take-off');
                    try_link.onmouseover = HTMLUtilities.mouseOverFragment(subImages[0].src.replace('.png','_ov.png'),subImages[0].id);
                    try_link.onmouseout = HTMLUtilities.mouseOverFragment(subImages[0].src,subImages[0].id);
                } else {
                    try_link.innerHTML = NCMallClientTrans.getTranslation(213);
                }
            }
        }
    );
}

// Given a Dojo nodeList of try_link anchor nodes, change them so that they're valid "Try on" links.
function try_on_elem(try_links, oii) {
    var obj_data = desc_arr[oii];
    try_links.forEach(
        function(try_link) {
            try_link.href = "javascript:;";
            try_link.style.color = 'green';
            try_link.oii = oii;
            var subImages = dojo.query('img',try_link);
            var hasImages = (subImages.length > 0);
            if (obj_data.isNeohome) {
                try_link.onclick = function() { showroom_click(this.oii); }
                if (hasImages) {
                    subImages[0].alt = NCMallClientTrans.getTranslation(675);
                    subImages[0].title = subImages[0].alt;
                    subImages[0].src = subImages[0].src.replace('take-off','try-on');
                    try_link.onmouseover = HTMLUtilities.mouseOverFragment(subImages[0].src.replace('.jpg','_ov.png'),subImages[0].id);
                    try_link.onmouseout = HTMLUtilities.mouseOverFragment(subImages[0].src,subImages[0].id);
                } else {
                    try_link.innerHTML = NCMallClientTrans.getTranslation(675);
                }
            } else {
                try_link.onclick = function() { preview_click(this.oii); }
                if (hasImages) {
                    subImages[0].alt = try_str;
                    subImages[0].title = subImages[0].alt;
                    subImages[0].src = subImages[0].src.replace('take-off','try-on');
                    try_link.onmouseover = HTMLUtilities.mouseOverFragment(subImages[0].src.replace('.jpg','_ov.png'), subImages[0].id);
                    try_link.onmouseout = HTMLUtilities.mouseOverFragment(subImages[0].src, subImages[0].id);
                } else {
                    try_link.innerHTML = try_str;
                }
            }
        }
    );
}

// Wrapper for take_off_elem that finds every instance of the 'Try' link for a given OII and sets it to 'Take off'.
function set_take_off(oii) {
    var try_links = dojo.query('.try_link_' + oii);
    take_off_elem(try_links, oii);
}

// Wrapper for try_on_elem that finds every instance of the 'Try' link for a given OII and sets it to 'Try on'.
function set_try_on(oii) {
    var try_links = dojo.query('.try_link_' + oii);
    try_on_elem(try_links, oii);
}


// ****************************************
// *********** EXTERNAL PREVIEW ***********
// ****************************************

function make_ext_prev(id,body,title,width,height,left,top,b_drag,z_index,margin,b_vis){
    rollovers_arr[id] = id;
    if( browser.isIE ){
        winW = document.body.offsetWidth;
        winH = document.body.offsetHeight;
    }else{
        winW = window.innerWidth;
        winH = window.innerHeight;
    }
    if( width === null ) width = 350;
    if( height === null ) height = 200;
    if( left === null ) left = parseInt(winW/2) - parseInt(width/2);
    if( top === null ) top = parseInt(winH/2) - parseInt(height/2);
    if( title === null ) title = NCMallClientTrans.getTranslation(216);
    if( b_drag === null ) b_drag = true;
    if( z_index === null ) z_index = 100;
    if( margin === null ) margin = '10px';
    else if( !isNaN(margin) ) margin += "px";

    if (browser.isIE || browser.isOpera) {
        scrollx = document.body.scrollLeft;
        scrolly = document.body.scrollTop;
    }
    else  {
        scrollx = window.scrollX;
        scrolly = window.scrollY;
    }
    shadow_width = parseInt(width * 1.05);
    shadow_height = parseInt(height * 1.05);
    shadow_left = parseInt(width*.05);
    shadow_top = parseInt(height*.05);
    left += scrollx;
    top += scrolly;
    container = document.createElement("div");
    container.id = id;
    if( b_drag ) container.onmousedown = function(event){( window.event ) ? dragStart(window.event,id) : dragStart(event,id)};
    body_div = document.createElement("div");
    if (isIE) {
        html_div = document.createElement("div");
        html_div = body;
    } else {
        html_div = body;
    }
    shadow_div = document.createElement("div");
    header_div = document.createElement("div");
    header_div.className = "sidebarHeader";
    header_div.innerHTML = "<table style=\"width: 100%;\" cellpadding='0' cellspacing='0' border='1'><tr><td><b>"+title+"</b></td><td style=\"text-align:right;\"><a href='javascript:;' onclick='close_ext_prev()'><b>X</b></a></td></tr></table>";
    shadow_div.innerHTML = "<img src='" + IMAGE_HOST + "/ncmall/shadow.png' width='"+shadow_width+"' height='"+shadow_height+"'>";
    html_div.style.position = 'relative';
    header_div.style.position = 'relative';
    body_div.style.position = 'absolute';
    shadow_div.style.position = 'absolute';
    shadow_div.style.left = shadow_left + 'px';
    shadow_div.style.top = shadow_top + 'px';
    shadow_div.style.zIndex = 1;
    shadow_div.style.width = shadow_width + 'px';
    shadow_div.style.height = shadow_height + 'px';
    html_div.style.margin = margin;
    body_div.style.width = width + 'px';
    body_div.style.height = (isIE) ? height + 'px' : height + 5 + 'px';
    body_div.style.zIndex = z_index;
    body_div.style.left = '0px';
    body_div.style.top = '0px';
    body_div.style.border = '2px solid lightgrey';
    body_div.style.backgroundColor = 'white';
    container.style.zIndex = 50000;
    container.appendChild(shadow_div);
    body_div.appendChild(header_div);
    body_div.appendChild(html_div);
    container.appendChild(body_div);
    document.getElementById('rollover_div').appendChild(container);
    if (isIE) {
        container.style.position = 'absolute';
    }
    else {
        container.style.position = 'fixed';
    }
    container.style.left = left + 'px';
    container.style.top = top + 'px';
    container.style.visibility = 'visible';
    html_div.style.overflow = 'hidden';
}

function open_ext_prev(){
    if (cur_preview == 'pet') {
        var prev_title = NCMallClientTrans.getTranslation(151);
        var ext_prev_height = 404;
        var frame_div_height = '384px';
    }
    else {
        var prev_title = NCMallClientTrans.getTranslation(658);
        var ext_prev_height = 416;
        var frame_div_height = '399px';
    }
    prev_height = document.getElementById('iframe_div').style.height;
    prev_width = document.getElementById('iframe_div').style.width;
    pet_render_complete = false;
    prev_frame = document.getElementById('preview_frame');
    prev_src = prev_frame.src;
    prev_frame.src = prev_src + "&id=ext_showroom";
    preview_div = document.getElementById('prev_frame_div');
    frame_div = document.getElementById('iframe_div');
    preview_div.parentNode.removeChild(preview_div);
    document.getElementById('empty_block').style.display = 'block';
    make_ext_prev('ext_prev_div', preview_div, prev_title, 365, ext_prev_height, 100, 100, true, null, '0px');
    frame_div.style.width = '365px';
    frame_div.style.height = frame_div_height;
    prev_frame_doc = prev_frame.contentWindow.document;
}

function close_ext_prev(){
    var el_name = (cur_preview == 'pet') ? 'CustomNeopetView' : 'NeoHomeApplicationFile';
    pet_render_complete = false;
    document.getElementById('empty_block').style.display = 'none';
    preview_div = document.getElementById('prev_frame_div');
    frame_div = document.getElementById('iframe_div');
    prev_frame = document.getElementById('preview_frame');
    frame_div.style.width = prev_width;
    frame_div.style.height = prev_height;
    prev_frame.src = prev_src + '&id=showroom';
    prev_parent = document.getElementById('prev_cell');
    prev_parent.appendChild(preview_div);
    try {
        remove_rollover('ext_prev_div');
    } catch(e) {}
}

function close_it() {
    setTimeout('close_ext_prev()',5000);
}

/*
DEPRECATED
function render_preview(){
	if (preview_index < preview_id_arr.length) {
		for (var i=preview_index; i<=preview_id_arr.length; i++) {
			if (preview_id_arr[i]) {
				preview_click(preview_id_arr[i]);
				preview_index++;
			}
		}
	}
}
*/

function add_previewed_assets() {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    if (preview_cleared) {
        for (var i = 0; i < zone_arr.length; i++) {
            zone_id = zone_arr[i];
            IFrameObj.CNV_RemPreviewItem(zone_id);
        }
    }

    for (index in preview_id_arr) {
        oii = preview_id_arr[index];
        for (asset_id in ODS_ObjectAssets[oii]) {
            Asset = ODS_Assets[asset_id];
            IFrameObj.CNV_AddPreviewItem(Asset);
        }
    }
}

function toggle_mute() {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    IFrameObj.CustomNeopetViewer_toggleMuteStatus();
    mute_status = !mute_status;
    if (!mute_status) {
        document.getElementById('mute_img').src = img_host + "/ncmall/speaker.png";
    }
    else document.getElementById('mute_img').src = img_host + "/ncmall/speaker_x.png";
}

function loadShowroomItems() {
    var type_arr = [floor, wall, door, window, furniture];

    for (type in type_arr) {
        //type = furniture;
        for (item_uid in showroom_arr[cur_view][type]) {
            if (showroom_arr[cur_view][type][item_uid]) {
                showroom_click(showroom_arr[cur_view][type][item_uid][0], item_uid, true);
            }
        }
    }
}

function loadWorld(world_id) {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    IFrameObj.loadWorld(world_id);
}

function deleteShowroomItem(oii) {
    swap_preview('home');
    var obj_data = desc_arr[oii];
    if (obj_data.isSuperpack) {
        clearRoomBag(oii);
        return;
    }
    else if (obj_data.wall || obj_data.door || obj_data.window || obj_data.floor) {
        clearNonFurnitureItem(oii);
        return;
    }
    else {
        var IFrameObj = document.getElementById('preview_frame').contentWindow;
        var delete_done = false;
        for (type in showroom_arr[cur_view]) {
            for (uid in showroom_arr[cur_view][type]) {
                if (!delete_done && showroom_arr[cur_view][type][uid] && showroom_arr[cur_view][type][uid][0] == oii) {
                    try {
                        IFrameObj.removeItem(uid);
                        delete_done = true;
                    } catch (e) {}
                    showroom_arr[cur_view][type][uid] = null;
                    for (var i=0; i<showroom_id_arr[cur_view].length; i++) {
                        if (showroom_id_arr[cur_view][i] == oii) {
                            updateShowroomArray(null, i);
                            i = showroom_id_arr[cur_view].length;
                        }
                    }
                }
            }
        }
        if (type == furniture) {
            furniture_count--;
        }
    }
}

function clearWallFloor() {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    var wall_oii = 0;
    var floor_oii = 0;
    var door_oii = 0;
    var window_oii = 0;

    if (!showroom_arr[cur_view][floor] && !showroom_arr[cur_view][wall] && !showroom_arr[cur_view][door] && !showroom_arr[cur_view][win]) {
        return;
    }
    //IFrameObj.document.getElementById('building_div').innerHTML = 'Clearing walls and floors';
    //IFrameObj.document.getElementById('building_div').style.display = 'block';
    //setTimeout("IFrameObj.document.getElementById('building_div').style.display = 'none'", 5000);
    for (key in showroom_arr[cur_view][wall]) wall_oii = showroom_arr[cur_view][wall][key][0];
    if (wall_oii != 0) for (key in showroom_id_arr[cur_view]) if (showroom_id_arr[cur_view][key] == wall_oii) {
        set_try_on(showroom_id_arr[cur_view][key]);
        updateShowroomArray(null, key);
    }
    for (key in showroom_arr[cur_view][floor]) floor_oii = showroom_arr[cur_view][floor][key][0];
    if (floor_oii != 0) {
        for (key in showroom_id_arr[cur_view]) {
            if (showroom_id_arr[cur_view][key] == floor_oii) {
                set_try_on(showroom_id_arr[cur_view][key]);
                updateShowroomArray(null, key);
            }
        }
    }
    for (key in showroom_arr[cur_view][door]) {
        door_oii = showroom_arr[cur_view][door][key][0];
    }
    if (door_oii != 0) {
        for (key in showroom_id_arr[cur_view]) {
            if (showroom_id_arr[cur_view][key] == door_oii) {
                set_try_on(showroom_id_arr[cur_view][key]);
                updateShowroomArray(null, key);
            }
        }
    }
    for (key in showroom_arr[cur_view][win]) {
        window_oii = showroom_arr[cur_view][win][key][0];
    }
    if (window_oii != 0) {
        for (key in showroom_id_arr[cur_view]) {
            if (showroom_id_arr[cur_view][key] == window_oii) {
                set_try_on(showroom_id_arr[cur_view][key]);
                updateShowroomArray(null, key);
            }
        }
    }

    showroom_arr[cur_view][floor] = null;
    showroom_arr[cur_view][wall] = null;
    showroom_arr[cur_view][door] = null;
    showroom_arr[cur_view][win] = null;
    IFrameObj.clearWall();
    IFrameObj.clearFloor();
    IFrameObj.clearDoor();
    IFrameObj.clearWindow();
    //IFrameObj.document.getElementById('building_div').style.display = 'none';
}

function clearAll() {
    document.getElementById('preview_frame').src = document.getElementById('preview_frame').src;
    for (key in showroom_id_arr[cur_view]) {
        if (showroom_id_arr[cur_view][key]) {
            set_try_on(showroom_id_arr[cur_view][key]);
        }
    }
    showroom_arr[cur_view] = [];
    showroom_id_arr[cur_view] = [];
    furniture_count = 0;
}

function clearRoomBag(oii) {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    var bag_data = desc_arr[oii];
    var clear_done = false;
    if (!bag_data.isSuperpack) return false;
    var member_oii_arr = bag_data['packContents'];
    for (var i in member_oii_arr) {
        var child_oii = member_oii_arr[i];
        deleteShowroomItem(child_oii);
    }
    for (var j in showroom_id_arr[cur_view]) {
        if (!clear_done && (oii == showroom_id_arr[cur_view][j])) {
            updateShowroomArray(null, j);
            clear_done = true;
        }
    }
    set_try_on(oii);
}

function clearNonFurnitureItem(oii) {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    var test_oii = 0;
    var obj_type = null;
    var obj_data = desc_arr[oii];
    var oii_arr = [];
    var obj_data_arr = [];
    if (obj_data.isSuperpack) {
        clearRoomBag(oii);
        return;
    }
    for (type in showroom_arr[cur_view]) {
        for (key in showroom_arr[cur_view][type]) {
            try {
                if (showroom_arr[cur_view][type][key][0] && showroom_arr[cur_view][type][key][0] == oii) {
                    showroom_arr[cur_view][type][key][0] = null;
                    obj_type = type;
                }
            } catch(e) {}
        }
    }
    if (obj_type != null) {
        for (key in showroom_id_arr[cur_view]) {
            if (showroom_id_arr[cur_view][key] == oii) {
                updateShowroomArray(null, key);
            }
        }
    }
    showroom_arr[cur_view][obj_type] = null;
    IFrameObj.clearNonFurnitureItem(obj_type);
    set_try_on(oii);
}

function swapView(new_view) {
    var IFrameObj = document.getElementById('preview_frame').contentWindow;
    if (!new_view || new_view != cur_view) {
        new_view = (cur_view == 'interior') ? 'exterior' : 'interior';
    }

    IFrameObj.switchView(new_view);
}

function aWholeNewWorld(world_id) {
    cur_world = world_id;
    cur_view = 'exterior';
    document.getElementById('preview_frame').src = document.getElementById('preview_frame').src;
}

function updateH5View(itemsList, takeoff=false){
    var petViewWindow = document.getElementById('preview_frame');
    var viewObj = {};

    if(takeoff){
        viewObj = {'message': 'takeoff', 'itemsList': itemsList};
    }else{
        viewObj = {'message': 'tryon', 'itemsList': itemsList};
    }

    petViewWindow.contentWindow.postMessage(viewObj);
}
