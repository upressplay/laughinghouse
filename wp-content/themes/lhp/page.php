<?php 
	get_header(); 


	if ( have_posts() ) {
		while ( have_posts() ) {

			the_post(); 

			$output = ""; 
			$output  .=  '<div class="headerImg">'; 
			if ( has_post_thumbnail() ) {
				$output  .=  '<img src="'.  get_the_post_thumbnail_url() .'" alt="'.get_the_title().'"/>'; 
			}
			$output  .=  '</div>'; 
			if(!is_front_page()){
				$output  .=  '<h1 class="pageSecTitle"> '.get_the_title().' </h1>';	
			}

			$section_link = get_sub_field('section_page');
			$page_poster = get_field('page_poster');

			$output  .=  '<div class="pageHeader">'; 
			
		    if($page_poster != "" || have_rows('page_links') ) {
		    	$output  .=  '<div class="pageInfoBody">'; 
		    	$output  .=  get_the_content(); 
		    	$output  .=  '</div><!-- pageInfoBody -->';

		    	$output  .=  '<div class="pageInfo">'; 
				if($page_poster != "") {
					$output  .= '<div class="pagePoster">'; 
					$output  .= '<img src="'.$page_poster['sizes']['medium'].'">';
					$output  .= '</div>'; 	
				}
				if( have_rows('page_links') ) {		
					$output  .=  '<div class="pageLinks">';  
			    	while( have_rows('page_links') ) {

			    		the_row(); 
			    		$output  .=  '<a href="'.get_sub_field('page_link').'" target="_blank" class="pageLink">'; 
						$output  .=  get_sub_field('page_link_txt');
						$output  .=  '</a>'; 
			    	}
			    	$output  .=  '</div>'; 
			    }
			    $output  .=  '</div><!-- pageInfo -->';

		    } else {
		    	$output  .=  '<div class="pageBody">'; 
		    	$output  .=  get_the_content(); 
		    	$output  .=  '</div><!-- pageBody -->';
		    }
			 
		   
			$output  .=  '</div><!-- pageHeader -->'; 

			
				
		    
			if( have_rows('page_gallery') ) {		 
		    	while( have_rows('page_gallery') ) {

		    		the_row(); 

		       		$section_title = get_sub_field('section_title');
		       		$section_link = get_sub_field('section_page');
		       		if($section_title != "") {

						if($section_link != "") {
							$output  .=  '<div class="pageSecTitleLink">'; 
							$output  .=  '<a href="'.$section_link.'">'; 	
							$output  .=  '<h2> '.$section_title.' </h2>';
							$output  .=  '</a>'; 
							$output  .=  '</div>'; 
						} else {
							$output  .=  '<div class="pageSecTitle">'; 
							$output  .=  '<h2> '.$section_title.' </h2>';
							$output  .=  '</div>'; 
						}
						
			       	}
					$output  .=  '<div class="pageRow">'; 
		       		$thumb_style = get_sub_field('thumb_style'); 
		       		$thumb_size = 'pageThumb'.$thumb_style['thumb_size'];
		       		$show_img = false;
		       		$show_title = false;
		       		$show_date = false;
		       		$show_body = false;
		       		$show_summary = false;

		       		foreach( $thumb_style['thumb_elements'] as $el ) {
		       			if($el == "img") $show_img = true;
		       			if($el == "title") $show_title = true;
		       			if($el == "date") $show_date = true;
		       			if($el == "body") $show_body = true;
		       			if($el == "summary") $show_summary = true;
		       		}

		       		$thumb_layout = $thumb_style['thumb_layout']; 
		       		
		       		$post_objects = get_sub_field('page_objects');

					foreach ( $post_objects as $post_object ) {
						foreach ( $post_object as $post) {
							setup_postdata( $post );

							include( locate_template( 'post.php', false, false ) ); 

							wp_reset_postdata();	
						}
					}
					$output  .=  '</div>'; 

				}
			}
			$output  .= '<div id="postOverlay"></div><!-- postOverlay -->';
			$cats = get_categories();

			foreach ( $cats as $cat ) {

				 $cat_name =$cat->name;

				 if( is_page($cat_name)) {
					global $post;
					$args = array( 'category_name' => $cat_name,  'numberposts' => 100, );
					$output  .=  '<div class="pageRow">'; 
					$category_posts = get_posts( $args );

					$posts_count = count($category_posts);
					foreach ( $category_posts as $post ) {
						setup_postdata( $post ); 
						$show_img = true;
		       			$show_title = true;
		       			$show_date = true;
		       			$show_body = false;
		       			$show_summary = true;
		       			$thumb_size = 'pageThumbRect';
		       			$thumb_layout = "Vert";
		       			if($cat_name == "News") {
		       				$thumb_size = 'pageThumbSq';
		       				$thumb_layout = "Horz";	
		       			}

		       			if($cat_name == "Gallery") {
		       				$thumb_size = 'pageThumbSqSm';
		       				$thumb_layout = "Sm";
		       				$show_title = false;
		       				$show_date = false;
		       				$show_summary = false;
		       			}
		       			if($cat_name == "Team") {
		       				$show_date = false;
		       				$thumb_size = 'pageThumbSq';
		       				$thumb_layout = "Horz";	
		       			}
						include( locate_template( 'post.php', false, false ) ); 	

					}
					$output  .=  '</div>'; 
					wp_reset_postdata();
				}
			}
		}
	}
	echo $output;

	get_footer();
?>