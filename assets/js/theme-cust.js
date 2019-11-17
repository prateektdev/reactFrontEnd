$(document).ready(function(){

  $('[data-toggle="tooltip"]').tooltip();   

   //          Edit Shareholders
  // =====================================
   $(".s_edit").click(function () {
	  $(this).parent(".s_hldr_view").siblings(".upd_s_holder").toggle();
	  $(this).hide();
   });

  //           Add Deed accordion
  // =====================================
   $(".accrdn_body").hide();
   $(".add_field").click(function () {
       $(this).parent(".accrdn_head").siblings(".accrdn_body").slideToggle('slow');
   });

   $(".create_tbl").click(function () {
       $(".create-tbl-block").slideToggle('slow');
   });


});