/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'images/bg01.jpg': 'center',
							'images/bg02.jpg': 'center',
							'images/bg03.jpg': 'center'
						},

					// Delay.
						delay: 6000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

	// (Signup form code removed as no signup form exists on the page.)

	// Feature modal interactions (deferred until DOM is parsed to ensure modal markup exists)
	document.addEventListener('DOMContentLoaded', function() {
		var overlay = document.getElementById('featureModal');
		if (!overlay) return; // modal not present
		var triggers = document.querySelectorAll('.feature-trigger');
		if (!triggers.length) return;
		var titleEl = document.getElementById('featureModalTitle');
		var preview = document.getElementById('featurePreview');
		var form = document.getElementById('featureForm');
		var textInput = document.getElementById('featureText');
		var fileInput = document.getElementById('featureImage');
		var closeButtons = overlay.querySelectorAll('[data-close]');
		var featureContent = {
			'ai-casting': { title: 'AI-Powered Casting', description: 'Our intelligent casting dashboard streamlines the entire talent selection process. View actor profiles, track statuses, and manage your casting pipeline with AI-powered recommendations and automated workflow management.' },
			'collaboration': { title: 'Collaborative Platform', placeholder: 'Foster effective collaboration with comprehensive team insights, voting systems, and real-time participation tracking. Monitor consensus rates, team member activity, and engagement levels to make informed casting decisions together.' },
			'gdpr': { title: 'GDPR Compliance', placeholder: 'Maintain complete control over your project with granular permission settings. Assign specific roles and capabilities to team members while ensuring GDPR compliance and data security throughout your casting process.' },
			'player-view': { title: 'Immersive Player View', placeholder: 'Watch auditions in our immersive player view that recreates the cinema experience. Review talent performances with integrated voting, team collaboration, and comprehensive media management - all in one seamless interface.' },
			'canvas': { title: 'Visual Casting Canvas', placeholder: 'Visualize your casting decisions with our innovative drag-and-drop canvas. Create multiple character groupings, explore different talent combinations, and experiment with various casting scenarios in an intuitive visual workspace.' },
			'end-to-end': { title: 'End-to-End Management', placeholder: 'Navigate through your entire casting process from initial long lists to final talent selection. Our comprehensive platform provides a single source of truth for all casting data, communications, and decision-making workflows.' }
		};

		function open(featureKey) {
			var data = featureContent[featureKey] || { title: 'Feature', placeholder: 'Notes...', description: '' };
			titleEl.textContent = data.title;
			if (textInput) {
				textInput.value = '';
				textInput.placeholder = data.placeholder || 'Notes...';
			}
			var descEl = document.getElementById('featureDescription');
			if (descEl) descEl.textContent = data.description || '';
			if (preview) {
				preview.style.backgroundImage = 'none';
				preview.textContent = 'Image Preview';
			}
			overlay.classList.add('active');
			overlay.setAttribute('aria-hidden', 'false');
			if (textInput) textInput.focus();
		}

		function close() {
			overlay.classList.remove('active');
			overlay.setAttribute('aria-hidden', 'true');
		}

		triggers.forEach(function(t) {
			 t.addEventListener('click', function(e) {
				 e.preventDefault();
				 open(t.getAttribute('data-feature'));
			 });
		});

		closeButtons.forEach(function(btn){ btn.addEventListener('click', close); });
		overlay.addEventListener('click', function(e){ if(e.target === overlay) close(); });
		window.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });

		if (fileInput && preview) {
			fileInput.addEventListener('change', function(){
				var file = fileInput.files && fileInput.files[0];
				if(!file) return;
				var reader = new FileReader();
				reader.onload = function(ev){
					preview.style.backgroundImage = 'url(' + ev.target.result + ')';
					preview.textContent = '';
				};
				reader.readAsDataURL(file);
			});
		}

		if (form) {
			form.addEventListener('submit', function(e){
				e.preventDefault();
				close();
			});
		}
	});

})();