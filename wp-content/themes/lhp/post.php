						<?php
							$link = get_permalink($post->ID);
							$title = get_the_title($post->ID);	
							$date = get_the_date('M d, Y', $post->ID);	
							$body = get_the_content($post->ID);
							$summary = get_the_excerpt($post->ID);	
							$cat = get_the_category($post->ID);
							$cat = $cat[0]->slug;

							$vidid = get_field('youtube_vidid');
							$playlist = get_field('youtube_playlist');

							$thumb = get_the_post_thumbnail_url( $post->ID, $thumb_size );
							//$img = get_the_post_thumbnail_url( $post->ID );
							$img = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "large" );

							if($show_link) {
								$output  .= '<a href="'. $link .'" data-postid="'.$post->ID.'" class="'.$cat .' post" >';	
							}
							
							$output  .= '<div class="pageThumb'.$thumb_layout .'" >';
							if($show_img) {
								$output  .= '<div class="'.$thumb_size.'"><img src="'. $thumb .'" alt="'.$title.'"/></div>';	
							}
							if($show_title || $show_date || $show_body || $show_summary) {
								$output  .= '<div class="pageThumbInfo">';	
								if($show_title) {
									$output  .= '<h3 class="pageThumbTitle">'. $title;	
								}
								if($show_date) {
									$output  .= '<div class="pageThumbDate">'. $date .'</div>';	
								}
								if($show_title) {
									$output  .= '</h3><!-- pageThumbTitle -->';	
								}
								if($show_body) {
									$output  .= '<div class="pageThumbBody">'. $body .'</div>';	
								}
								if($show_summary) {
									$output  .= '<div class="pageThumbBody">'. $summary .'</div>';	
								}
								$output  .= '</div><!-- pageThumbInfo -->';
							}
							
							$output  .= '</div><!-- pageThumb -->';
							if($show_link) {
								$output  .= '</a>';	
							}
							
							$output  .= '<div id="'.$post->ID.'" class="postContent" data-hires="'.$img[0].'" data-hires-w="'.$img[1].'" data-hires-h="'.$img[2].'" data-vidid="'.$vidid.'" data-playlist="'.$playlist.'" data-cat="'.$cat.'">';
							if($cat != "videos" && $cat != "gallery") {
								$output  .=  '<div class="pageSecTitle"> '.$title.' </div>';
								$output  .= '<div class="pageThumbDate">'. $date .'</div>';	

								$output  .= '<div class="pageShare">';	
								$output  .= '<div class="socialBtn share" data-type="facebook" data-title="'.$title.'" data-url="'.$link.'" data-desc="'. $summary .'">
						                          <span class="fab fa-facebook-square" aria-hidden="true" ></span>
						                          <span class="screen-reader-text">Facebook</span>
						                        </div>';
						        $output  .= '<div class="socialBtn share" data-type="twitter" data-title="'.$title.'" data-url="'.$link.'" data-desc="'. $summary .'">
						                          <span class="fab fa-twitter-square" aria-hidden="true" ></span>
						                          <span class="screen-reader-text">Twitter</span>
						                        </div>';
                        		$output  .= '</div><!-- pageShare -->';
								$output  .= '<div class="pageBody">'. $body .'</div>';
							}
							$output  .= '<div data-id="'.$post->ID.'" class="postClose fas fa-times-circle"></div>';
							
							$output  .= '<div class="rightArrow">
											<span class="fas fa-arrow-circle-right" aria-hidden="true" ></span>
						                    <span class="screen-reader-text">Next Post</span>
										</div>';
							$output  .= '<div class="leftArrow">
											<span class="fas fa-arrow-circle-left" aria-hidden="true" ></span>
						                    <span class="screen-reader-text">Back Post</span>
										</div>';
							$output  .= '</div><!-- postContent -->';
							?>